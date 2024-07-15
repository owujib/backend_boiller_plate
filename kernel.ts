import 'reflect-metadata';
import 'dotenv/config';
import express, {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import morgan from 'morgan';
import {
  setGlobalErrorHandler,
  setGlobalMiddlewares,
  setRoutes,
} from './utils/serverUtils';
import {
  Controller,
  RouteTypeInterface,
  requestHandler as serverRequestHandler,
} from './decorators/RouteHandler';
import Logger from './services/Logger';

process.env.TZ = 'Africa/Lagos';

class Kernel {
  app: express.Application;

  constructor() {
    this.app = express();
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
    setGlobalMiddlewares(this.app);
    this.app.set('views', path.join(__dirname, '../views'));
    this.app.set('view engine', 'ejs');
    this.app.use(express.json());
    this.app.set('PORT', process.env.PORT || 5001);
    this.app.set('NODE_ENV', process.env.NODE_ENV);
    this.app.use(this.responseInterceptor);
  }

  webhooks() {}

  routes() {
    setRoutes(this.app);

    this.app.get('/', (req, res, next) =>
      res.status(200).json({
        message: 'hello',
      }),
    );

    /**catch 404 */
    // this.app.all('*', (req, res, next)=>{
    //   throw next(new Api)
    // })
  }

  errorHandler() {
    setGlobalErrorHandler(this.app);
  }

  loadRoutes() {
    const routesDir = path.join(__dirname, 'routes');

    fs.readdirSync(routesDir).forEach((file) => {
      const extname = path.extname(file);
      if (extname === '.ts' || extname === '.js') {
        if (file !== 'index.ts') {
          const routeModule = require(path.join(routesDir, file)).default;

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
    const controllersDir = path.join(__dirname, 'controllers');

    fs.readdirSync(controllersDir).forEach((file) => {
      const extension = path.extname(file);
      const isControllerFile =
        ['.ts', '.js'].includes(extension) && file !== 'BaseController.ts';

      if (isControllerFile) {
        const controllerModule = require(path.join(controllersDir, file));

        if (controllerModule && controllerModule.default) {
          const ControllerClass = controllerModule.default;
          const controllerInstance = new ControllerClass();
          const ClassPrototype = ControllerClass.prototype;

          if (ClassPrototype && ClassPrototype.basePath) {
            const basePath = ClassPrototype.basePath;
            const routes = ClassPrototype.routes || [];

            // Arrays to store routes
            const serverRoutes: any[] = [];
            const requestHandlerDecorator: any[] = [];

            // Iterate over routes defined in the controller
            routes.forEach((route: RouteTypeInterface) => {
              const method = route.method.toLowerCase();
              const fullPath = `${basePath}${route.path}`;

              // Check if there are requestHandler middlewares
              const requestHandler = ClassPrototype.requestMiddleware || {};
              const middleware = ClassPrototype.middleware || {};

              if (requestHandler[route.key]) {
                // Handle routes with requestHandler decorators
                const requestHandlerMiddleware = middleware[route.key] || [];

                const middlewares = requestHandlerMiddleware.map(
                  (handler: any) => {
                    return (req: Request, res: Response, next: NextFunction) =>
                      handler(req, res, next);
                  },
                );

                const handlersMiddleware: RequestHandler[] = [];
                requestHandler[route.key].forEach((routeHandler: any) => {
                  handlersMiddleware.push(
                    (req: Request, res: Response, next: NextFunction) => {
                      routeHandler(req, res, next);
                    },
                  );
                });

                // Store the decorated request handler route
                requestHandlerDecorator.push({
                  method,
                  path: fullPath,
                  middlewares,
                  handlersMiddleware,
                  fn: serverRequestHandler()(ClassPrototype, route.key, {
                    value: ClassPrototype[route.key],
                  }),
                });

                // Remove requestHandler middleware after processing
                delete ClassPrototype.requestMiddleware[route.key];
                if (
                  ClassPrototype.middleware &&
                  ClassPrototype.middleware[route.key]
                ) {
                  delete ClassPrototype.middleware[route.key];
                }
              } else {
                // Handle regular server routes
                const handlers: RequestHandler[] = [];
                const middleware =
                  ClassPrototype.middleware &&
                  ClassPrototype.middleware[route.key];

                (middleware || []).map((el: any) => {
                  handlers.push((req, res, next) => {
                    el(req, res, next);
                  });
                });

                serverRoutes.push({
                  handlers,
                  ...route,
                  fn: ClassPrototype[route.key].bind(ClassPrototype),
                });
                // serverRoutes.push({
                //   method,
                //   path: fullPath,
                //   fn: ClassPrototype[route.key].bind(controllerInstance),
                // });
              }
            });

            // Register all server routes
            serverRoutes.forEach(({ method, path, key, handlers, fn }) => {
              (this.app as any)[method.toLowerCase()](
                `${basePath}${path}`,
                handlers,
                fn,
              );
            });

            // Register requestHandlerDecorator routes
            requestHandlerDecorator.forEach(
              ({ method, path, middlewares, handlersMiddleware, fn }) => {
                (this.app as any)[method.toLowerCase()](
                  path,
                  [...middlewares, ...handlersMiddleware],
                  fn.value,
                );
              },
            );
          } else {
            Logger.warn(
              `Controller ${ControllerClass.name} does not have a basePath property.`,
            );
          }
        } else {
          Logger.warn(
            `Controller module not found or does not have a default export.`,
          );
        }
      }
    });
  }

  responseInterceptor(req: Request, res: Response, next: NextFunction) {
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
    res.json = function (body: any) {
      // Add timestamp and success fields to JSON response
      if (typeof body === 'object') {
        body.timestamp = Date.now();
        body.success = true;
      }
      // Call the original json method
      return originalJson.call(this, body);
    };

    // Override send method
    res.send = function (body: any) {
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

  existInRoutes(
    propertyKey: string,
    arr: RouteTypeInterface[],
  ): { payload: RouteTypeInterface | null; index: number } {
    const index = arr.findIndex((object) => object.key === propertyKey);
    if (index !== -1) {
      return { payload: arr[index], index };
    }
    return { payload: null, index: -1 };
  }
}

export default new Kernel().app;
