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
import { Controller, requestHandler } from './decorators/RouteHandler';
import Logger from './services/Logger';

process.env.TZ = 'Africa/Lagos';

class Kernel {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.webhooks();
    this.loadControllers();
    this.routes();
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
  }

  errorHandler() {
    setGlobalErrorHandler(this.app);
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

          if (ControllerClass.prototype && ControllerClass.prototype.basePath) {
            if (
              ControllerClass.prototype.routes &&
              ControllerClass.prototype.routes.length > 0
            ) {
              ControllerClass.prototype.routes.forEach((route: any) => {
                const method = route.method.toLowerCase();
                const fullPath = `${ControllerClass.prototype.basePath}${route.path}`;
                const handlers: RequestHandler[] = [];

                const classMiddleware = ControllerClass.middleware;

                const middleWareHandler =
                  ControllerClass.prototype.middleware &&
                  ControllerClass.prototype.middleware[route.key]
                    ? ControllerClass.prototype.middleware[route.key]
                    : [];

                if (middleWareHandler && middleWareHandler.length > 0) {
                  middleWareHandler?.forEach((mw: RequestHandler) => {
                    handlers.push(mw);
                  });
                }

                // Wrap the handler with the requestHandler decorator
                const wrappedHandler = requestHandler()(
                  ControllerClass.prototype,
                  route.key,
                  { value: ControllerClass.prototype[route.key] },
                );

                // console.log({
                //   wrappedHandler,
                //   handlers,
                //   middleWareHandler,
                //   classMiddleware,
                // });

                Logger.info(
                  `${method.toUpperCase()}: ${route.path} on  ${
                    ControllerClass.name
                  }`,
                );

                // Bind the handler to the controller instance and pass it as middleware
                (this.app as any)[method.toLowerCase()](
                  fullPath,
                  ...handlers,
                  wrappedHandler,
                );
              });
            }
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
}

export default new Kernel().app;
