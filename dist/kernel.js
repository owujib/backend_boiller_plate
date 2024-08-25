"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const serverUtils_1 = require("./utils/serverUtils");
const RouteHandler_1 = require("./decorators/RouteHandler");
const Logger_1 = __importDefault(require("./services/Logger"));
process.env.TZ = 'Africa/Lagos';
class Kernel {
    constructor() {
        this.app = (0, express_1.default)();
        this.middlewares();
        this.webhooks();
        this.routes();
        this.loadControllers();
        this.loadRoutes();
        this.errorHandler();
        // if (fileConfig.default === 'local') {
        //   const dir = process.env.UPLOADS_DIR!;
        //   if (!fs.existsSync(dir)) {
        //     fs.mkdirSync(dir);
        //   }
        // }
    }
    middlewares() {
        (0, serverUtils_1.setGlobalMiddlewares)(this.app);
        this.app.set('views', path_1.default.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');
        this.app.use(express_1.default.json());
        this.app.set('PORT', process.env.PORT || 5001);
        this.app.set('NODE_ENV', process.env.NODE_ENV);
        this.app.use(this.responseInterceptor);
    }
    webhooks() { }
    routes() {
        (0, serverUtils_1.setRoutes)(this.app);
        this.app.get('/', (req, res, next) => res.status(200).json({
            message: 'hello',
        }));
        /**catch 404 */
        // this.app.all('*', (req, res, next)=>{
        //   throw next(new Api)
        // })
    }
    errorHandler() {
        (0, serverUtils_1.setGlobalErrorHandler)(this.app);
    }
    loadRoutes() {
        const routesDir = path_1.default.join(__dirname, 'routes');
        fs_1.default.readdirSync(routesDir).forEach((file) => {
            const extname = path_1.default.extname(file);
            if (extname === '.ts' || extname === '.js') {
                if (file !== 'index.ts') {
                    const routeModule = require(path_1.default.join(routesDir, file)).default;
                    // Mount the router from each route module
                    if (routeModule && typeof routeModule === 'function') {
                        const basePath = `/${file.replace('.ts', '').replace('.js', '')}`;
                        this.app.use(routeModule);
                    }
                }
            }
        });
    }
    loadControllers() {
        const controllersDir = path_1.default.join(__dirname, 'controllers');
        fs_1.default.readdirSync(controllersDir).forEach((file) => {
            const extension = path_1.default.extname(file);
            const isControllerFile = ['.ts', '.js'].includes(extension) && file !== 'BaseController.ts';
            if (isControllerFile) {
                const controllerModule = require(path_1.default.join(controllersDir, file));
                if (controllerModule && controllerModule.default) {
                    const ControllerClass = controllerModule.default;
                    const controllerInstance = new ControllerClass();
                    const ClassPrototype = ControllerClass.prototype;
                    if (ClassPrototype && ClassPrototype.basePath) {
                        const basePath = ClassPrototype.basePath;
                        const routes = ClassPrototype.routes || [];
                        // Arrays to store routes
                        const serverRoutes = [];
                        const requestHandlerDecorator = [];
                        // Iterate over routes defined in the controller
                        routes.forEach((route) => {
                            const method = route.method.toLowerCase();
                            const fullPath = `${basePath}${route.path}`;
                            // Check if there are requestHandler middlewares
                            const requestHandler = ClassPrototype.requestMiddleware || {};
                            const middleware = ClassPrototype.middleware || {};
                            if (requestHandler[route.key]) {
                                // Handle routes with requestHandler decorators
                                const requestHandlerMiddleware = middleware[route.key] || [];
                                const middlewares = requestHandlerMiddleware.map((handler) => {
                                    return (req, res, next) => handler(req, res, next);
                                });
                                const handlersMiddleware = [];
                                requestHandler[route.key].forEach((routeHandler) => {
                                    handlersMiddleware.push((req, res, next) => {
                                        routeHandler(req, res, next);
                                    });
                                });
                                // Store the decorated request handler route
                                requestHandlerDecorator.push({
                                    method,
                                    path: fullPath,
                                    middlewares,
                                    handlersMiddleware,
                                    fn: (0, RouteHandler_1.requestHandler)()(ClassPrototype, route.key, {
                                        value: ClassPrototype[route.key],
                                    }),
                                });
                                // Remove requestHandler middleware after processing
                                delete ClassPrototype.requestMiddleware[route.key];
                                if (ClassPrototype.middleware &&
                                    ClassPrototype.middleware[route.key]) {
                                    delete ClassPrototype.middleware[route.key];
                                }
                            }
                            else {
                                // Handle regular server routes
                                const handlers = [];
                                const middleware = ClassPrototype.middleware &&
                                    ClassPrototype.middleware[route.key];
                                (middleware || []).map((el) => {
                                    handlers.push((req, res, next) => {
                                        el(req, res, next);
                                    });
                                });
                                serverRoutes.push(Object.assign(Object.assign({ handlers }, route), { fn: ClassPrototype[route.key].bind(ClassPrototype) }));
                                // serverRoutes.push({
                                //   method,
                                //   path: fullPath,
                                //   fn: ClassPrototype[route.key].bind(controllerInstance),
                                // });
                            }
                        });
                        // Register all server routes
                        serverRoutes.forEach(({ method, path, key, handlers, fn }) => {
                            this.app[method.toLowerCase()](`${basePath}${path}`, handlers, fn);
                        });
                        // Register requestHandlerDecorator routes
                        requestHandlerDecorator.forEach(({ method, path, middlewares, handlersMiddleware, fn }) => {
                            this.app[method.toLowerCase()](path, [...middlewares, ...handlersMiddleware], fn.value);
                        });
                    }
                    else {
                        Logger_1.default.warn(`Controller ${ControllerClass.name} does not have a basePath property.`);
                    }
                }
                else {
                    Logger_1.default.warn(`Controller module not found or does not have a default export.`);
                }
            }
        });
    }
    responseInterceptor(req, res, next) {
        // const originalJson = res.json;
        // const originalSend = res.send;
        // res.json = function (body: any) {
        //   body.timestamp = Date.now();
        //   return originalJson.call(this, body);
        // };
        // res.send = function (body: any) {
        //   if (typeof body === 'object') {
        //     body.timestamp = Date.now();
        //     body.success = true;
        //   }
        //   return originalSend.call(this, body);
        // };
        // Store reference to original response methods
        const originalJson = res.json;
        const originalSend = res.send;
        // Override json method
        res.json = function (body) {
            // Add timestamp and success fields to JSON response
            if (typeof body === 'object') {
                body.timestamp = Date.now();
                body.success = true;
            }
            // Call the original json method
            return originalJson.call(this, body);
        };
        // Override send method
        res.send = function (body) {
            // Check if body is a function (like res.render)
            if (typeof body === 'function') {
                // Call the original send method with the function
                return originalSend.call(this, body);
            }
            // Check if body is an object (like JSON data)
            if (typeof body === 'object') {
                // Add timestamp and success fields to JSON response
                body.timestamp = Date.now();
                body.success = true;
                // Call the original send method with the JSON data
                return originalSend.call(this, body);
            }
            // For other types of body (like strings or buffers), call the original send method
            return originalSend.call(this, body);
        };
        next();
    }
    existInRoutes(propertyKey, arr) {
        const index = arr.findIndex((object) => object.key === propertyKey);
        if (index !== -1) {
            return { payload: arr[index], index };
        }
        return { payload: null, index: -1 };
    }
}
exports.default = new Kernel().app;
//# sourceMappingURL=kernel.js.map