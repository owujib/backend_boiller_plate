import {
  Controller,
  Get,
  Post,
  requestHandler,
} from '../decorators/RouteHandler';
import { UseMiddleware } from '../decorators/UseMiddleware';
import LocalUploadService from '../services/LocalUploadService';
import { Logger } from '../services/Logger';
import BaseController from './BaseController';
import { NextFunction, Request, Response } from 'express';

function customMiddleware(
  req: Request,
  res: Response,
  done: (err?: any) => void,
  // next: NextFunction,
) {
  // Perform actions before executing the route handler
  console.log('Custom Middleware: Before executing route handler');
  // You can add your custom middleware logic here
  done(); // Call done to proceed to next middleware or handler
}
function anotherCustomMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Perform actions before executing the route handler
  console.log('Another Custom Middleware: Before executing route handler');
  // You can add your custom middleware logic here
  next();
}

@Controller('/api')
// @UseMiddleware(function anotherCustomHere(req, res, next) {
//   console.log('COntroller middleware');
//   return next();
// })
class UserController {
  constructor(private logger: Logger) {}
  @Get('/test')
  @UseMiddleware(anotherCustomMiddleware)
  @requestHandler(customMiddleware)
  public test() {
    const user = { id: 1, name: 'John Doe' };

    return user;
  }
  @Get('/bro')
  @requestHandler()
  public bro() {
    const user = { id: 1, name: 'John Bro' };
    return user;
  }

  @Post('/upload/local')
  // @requestHandler(LocalUploadService.uploadMiddleware())
  @UseMiddleware(LocalUploadService.uploadMiddleware(), anotherCustomMiddleware)
  public async uploadLocal(req: Request, res: Response, next: NextFunction) {
    console.log(req.file);
    const result = LocalUploadService.handleUpload((<any>req).file);
    return res.status(200).json(result);
  }

  @Get('/yellow')
  public getYellow(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: 'beans' });
  }
}

export default UserController;

// import 'reflect-metadata';
// import 'dotenv/config';
// import express, {
//   NextFunction,
//   Request,
//   Response,
//   RequestHandler,
// } from 'express';
// import cors from 'cors';
// import path from 'path';
// import fs from 'fs';
// import morgan from 'morgan';
// import {
//   setGlobalErrorHandler,
//   setGlobalMiddlewares,
//   setRoutes,
// } from './utils/serverUtils';
// import {
//   Controller,
//   RouteTypeInterface,
//   requestHandler,
// } from './decorators/RouteHandler';
// import Logger from './services/Logger';

// process.env.TZ = 'Africa/Lagos';

// class Kernel {
//   app: express.Application;

//   constructor() {
//     this.app = express();
//     this.middlewares();
//     this.webhooks();
//     this.loadControllers();
//     this.routes();
//     this.errorHandler();

//     // if (fileConfig.default === 'local') {
//     //   const dir = process.env.UPLOADS_DIR!;
//     //   if (!fs.existsSync(dir)) {
//     //     fs.mkdirSync(dir);
//     //   }
//     // }
//   }

//   middlewares() {
//     setGlobalMiddlewares(this.app);
//     this.app.set('views', path.join(__dirname, '../views'));
//     this.app.set('view engine', 'ejs');
//     this.app.use(express.json());
//     this.app.set('PORT', process.env.PORT || 5001);
//     this.app.set('NODE_ENV', process.env.NODE_ENV);
//     this.app.use(this.responseInterceptor);
//   }

//   webhooks() {}

//   routes() {
//     setRoutes(this.app);

//     this.app.get('/', (req, res, next) =>
//       res.status(200).json({
//         message: 'hello',
//       }),
//     );

//     /**catch 404 */
//     // this.app.all('*', (req, res, next)=>{
//     //   throw next(new Api)
//     // })
//   }

//   errorHandler() {
//     setGlobalErrorHandler(this.app);
//   }

//   loadControllers() {
//     const controllersDir = path.join(__dirname, 'controllers');

//     fs.readdirSync(controllersDir).forEach((file) => {
//       const extension = path.extname(file);
//       const isControllerFile =
//         ['.ts', '.js'].includes(extension) && file !== 'BaseController.ts';

//       if (isControllerFile) {
//         const controllerModule = require(path.join(controllersDir, file));

//         if (controllerModule && controllerModule.default) {
//           const ControllerClass = controllerModule.default;
//           // console.log(ControllerClass.prototype);

//           if (ControllerClass.prototype && ControllerClass.prototype.basePath) {
//             const route = ControllerClass.prototype.routes;
//             // console.log(route);
//             if (route) {
//               route.map((route: RouteTypeInterface) => {
//                 const method = route.method.toLowerCase();
//                 const fullPath = `${ControllerClass.prototype.basePath}${route.path}`;
//                 const handlers: RequestHandler[] = [];
//                 console.log(route);

//                 // const middleWareHandler =
//                 //   ControllerClass.prototype.middleware &&
//                 //   ControllerClass.prototype.middleware[route.key]
//                 //     ? ControllerClass.prototype.middleware[route.key]
//                 //     : [];

//                 // if (middleWareHandler && middleWareHandler.length > 0) {
//                 //   middleWareHandler?.forEach((mw: RequestHandler) => {
//                 //     handlers.push(mw);
//                 //   });
//                 // }
//                 // const wrappedRequestMiddlewareHandler =
//                 //   ControllerClass.prototype.requestMiddleware &&
//                 //   ControllerClass.prototype.requestMiddleware[route.key]
//                 //     ? ControllerClass.prototype.requestMiddleware[route.key]
//                 //     : [];
//                 const requestMiddleware =
//                   ControllerClass.prototype.requestMiddleware &&
//                   ControllerClass.prototype.requestMiddleware[route.key]
//                     ? ControllerClass.prototype.requestMiddleware[route.key]
//                     : [];

//                 // console.log(ControllerClass.prototype);

//                 if (requestMiddleware) {
//                   const requestHandlerRoutes = ControllerClass.prototype.routes;

//                   const getRouteIndex = this.existInRoutes(
//                     route.key,
//                     requestHandlerRoutes,
//                   );
//                   const requesHandlerMiddleware =
//                     ControllerClass.prototype.middleware &&
//                     ControllerClass.prototype.middleware[
//                       getRouteIndex.payload?.key as string
//                     ]
//                       ? ControllerClass.prototype.middleware[
//                           getRouteIndex.payload?.key as string
//                         ]
//                       : [];

//                   const middleware =
//                     ControllerClass.prototype.middleware &&
//                     ControllerClass.prototype.middleware;

//                   if (
//                     getRouteIndex.payload !== null &&
//                     getRouteIndex.index !== -1 &&
//                     middleware
//                   ) {
//                     const wrappedRequestMiddlewareHandler = requestHandler()(
//                       ControllerClass.prototype,
//                       getRouteIndex.payload.key,
//                       {
//                         value:
//                           ControllerClass.prototype[getRouteIndex.payload.key],
//                       },
//                     );

//                     Logger.info(
//                       `${method.toUpperCase()}: ${fullPath} mapped to Requesthandler middleware\n`,
//                     );

//                     (this.app as any)[method.toLowerCase()](
//                       fullPath,
//                       requesHandlerMiddleware.map((handler: any) => {
//                         return (
//                           req: Request,
//                           res: Response,
//                           next: NextFunction,
//                         ) => {
//                           handler(req, res, next);
//                         };
//                       }),
//                       wrappedRequestMiddlewareHandler,
//                     );

//                     ControllerClass.prototype.routes.splice(
//                       getRouteIndex.index,
//                       1,
//                     );

//                     delete ControllerClass.prototype.middleware[
//                       getRouteIndex.payload.key
//                     ];
//                   }
//                 }

//                 const middleWareHandler =
//                   ControllerClass.prototype.middleware &&
//                   ControllerClass.prototype.middleware[route.key]
//                     ? ControllerClass.prototype.middleware[route.key]
//                     : [];

//                 if (middleWareHandler && middleWareHandler.length > 0) {
//                   middleWareHandler?.forEach((mw: RequestHandler) => {
//                     handlers.push(mw);
//                   });
//                 }

//                 Logger.info(
//                   `[${method.toUpperCase()}] ${fullPath} to ${
//                     ControllerClass.name
//                   }`,
//                 );
//                 // Bind the handler to the controller instance and pass it as middleware
//                 (this.app as any)[method.toLowerCase()](
//                   fullPath,
//                   handlers.map((routeHandler) => {
//                     return (
//                       req: Request,
//                       res: Response,
//                       next: NextFunction,
//                     ) => {
//                       return routeHandler(req, res, next);
//                     };
//                   }),
//                   // wrappedHandler,
//                 );
//               });
//             }
//           } else {
//             Logger.warn(
//               `Controller ${ControllerClass.name} does not have a basePath property.`,
//             );
//           }
//         } else {
//           Logger.warn(
//             `Controller module not found or does not have a default export.`,
//           );
//         }
//       }
//     });
//   }

//   responseInterceptor(req: Request, res: Response, next: NextFunction) {
//     // const originalJson = res.json;
//     // const originalSend = res.send;

//     // res.json = function (body: any) {
//     //   body.timestamp = Date.now();
//     //   return originalJson.call(this, body);
//     // };

//     // res.send = function (body: any) {
//     //   if (typeof body === 'object') {
//     //     body.timestamp = Date.now();
//     //     body.success = true;
//     //   }
//     //   return originalSend.call(this, body);
//     // };

//     // Store reference to original response methods
//     const originalJson = res.json;
//     const originalSend = res.send;

//     // Override json method
//     res.json = function (body: any) {
//       // Add timestamp and success fields to JSON response
//       if (typeof body === 'object') {
//         body.timestamp = Date.now();
//         body.success = true;
//       }
//       // Call the original json method
//       return originalJson.call(this, body);
//     };

//     // Override send method
//     res.send = function (body: any) {
//       // Check if body is a function (like res.render)
//       if (typeof body === 'function') {
//         // Call the original send method with the function
//         return originalSend.call(this, body);
//       }

//       // Check if body is an object (like JSON data)
//       if (typeof body === 'object') {
//         // Add timestamp and success fields to JSON response
//         body.timestamp = Date.now();
//         body.success = true;
//         // Call the original send method with the JSON data
//         return originalSend.call(this, body);
//       }

//       // For other types of body (like strings or buffers), call the original send method
//       return originalSend.call(this, body);
//     };

//     next();
//   }

//   existInRoutes(
//     propertyKey: string,
//     arr: RouteTypeInterface[],
//   ): { payload: RouteTypeInterface | null; index: number } {
//     const index = arr.findIndex((object) => object.key === propertyKey);
//     if (index !== -1) {
//       return { payload: arr[index], index };
//     }
//     return { payload: null, index: -1 };
//   }
// }

// export default new Kernel().app;

// const routeMiddleware = middleware && middleware[route.key];
// (routeMiddleware || [])?.forEach((mw: RequestHandler) => {
//   handlers.push((req, res, next) => {
//     return mw(req, res, next);
//   });
// });

// Logger.info(
//   `[${method.toUpperCase()}] ${fullPath} to ${
//     ControllerClass.name
//   }`,
// );
// // Bind the handler to the controller instance and pass it as middleware
// (this.app as any)[method.toLowerCase()](
//   fullPath,
//   handlers,
//   // wrappedHandler,
// );
