import 'reflect-metadata';
import {
  Request,
  Response,
  NextFunction,
  RequestHandler as ExpressRequestHandler,
} from 'express';
import { inspect } from 'util';

type ControllerDecorator = (basePath: string) => ClassDecorator;

export const Controller: ControllerDecorator = (basePath: string) => {
  return (target: any) => {
    target.prototype.basePath = basePath;
    return target;
  };
};

export interface RouteTypeInterface {
  path: string;
  method: string;
  key: string;
}

function createRouteDecorator(method: string) {
  return (path: string): MethodDecorator => {
    return (
      target: any,
      key: string | symbol,
      descriptor: PropertyDescriptor,
    ) => {
      const routes: RouteTypeInterface[] = target.routes || [];
      routes.push({ path, method, key: key.toString() });
      target.routes = routes;

      return descriptor;
    };
  };
}

export const Get = createRouteDecorator('GET');
export const Post = createRouteDecorator('POST');
export const Put = createRouteDecorator('PUT');
export const Patch = createRouteDecorator('PATCH');
export const Delete = createRouteDecorator('DELETE');

// function requestHandler(...requestMiddleware: any[]): MethodDecorator {
//   return function (
//     target: any,
//     propertyKey: string | symbol,
//     descriptor: PropertyDescriptor,
//   ) {
//     const originalMethod = descriptor.value;

//     descriptor.value = function (
//       req: Request,
//       res: Response,
//       next: NextFunction,
//     ) {
//       try {
//         // Invoke the original method without passing req, res, and next explicitly
//         const result = originalMethod.call(this);

//         console.log({ target: target, descriptor });

//         if (
//           result &&
//           typeof result.then === 'function' &&
//           typeof result.catch === 'function'
//         ) {
//           // If the result is a Promise, handle it accordingly
//           result
//             .then((data: any) => {
//               return res.json(data); // Send JSON response if Promise resolves
//             })
//             .catch((error: any) => {
//               return next(error); // Pass error to error handling requestMiddleware if Promise rejects
//             });
//         } else if (result !== undefined) {
//           return res.json(result); // Send JSON response if result is not undefined
//         } else if (result instanceof Response) {
//           return result;
//         }
//       } catch (error) {
//         next(error); // Pass error to error handling requestMiddleware if an exception occurs
//       }
//     };

//     // Apply requestMiddleware to the route handler
//     if (requestMiddleware.length > 0) {
//       if (!target.requestMiddleware) {
//         target.requestMiddleware = {};
//       }

//       // Ensure requestMiddleware is an array
//       if (!target.requestMiddleware[propertyKey]) {
//         target.requestMiddleware[propertyKey] = [];
//       }

//       // Push requestMiddleware to the array
//       target.requestMiddleware[propertyKey].push(
//         ...(Array.isArray(requestMiddleware)
//           ? requestMiddleware
//           : [requestMiddleware]),
//       );
//     }

//     return descriptor.value;
//   };
// }

// function requestHandler(...requestMiddleware: any[]): MethodDecorator {
//   return function (
//     target: any,
//     propertyKey: string | symbol,
//     descriptor: PropertyDescriptor,
//   ) {
//     const originalMethod = descriptor.value;

//     descriptor.value = async function (
//       req: Request,
//       res: Response,
//       next: NextFunction,
//     ) {
//       try {
//         // Invoke the original method without passing req, res, and next explicitly
//         const result = await originalMethod.call(this);

//         console.log({ target, descriptor });

//         // Apply requestMiddleware to the result
//         if (requestMiddleware.length > 0) {
//           for (const middleware of requestMiddleware) {
//             await new Promise((resolve, reject) => {
//               middleware(result, req, res, (err: any) => {
//                 if (err) {
//                   reject(err);
//                 } else {
//                   resolve(null);
//                 }
//               });
//             });
//           }
//         }

//         if (result !== undefined) {
//           return res.json(result); // Send JSON response if result is not undefined
//         }
//       } catch (error) {
//         next(error); // Pass error to error handling middleware if an exception occurs
//       }
//     };

//     // Apply requestMiddleware to the route handler
//     if (requestMiddleware.length > 0) {
//       if (!target.requestMiddleware) {
//         target.requestMiddleware = {};
//       }

//       // Ensure requestMiddleware is an array
//       if (!target.requestMiddleware[propertyKey]) {
//         target.requestMiddleware[propertyKey] = [];
//       }

//       // Push requestMiddleware to the array
//       target.requestMiddleware[propertyKey].push(...requestMiddleware);
//     }

//     return descriptor;
//   };
// }

function requestHandler(...requestMiddleware: any[]): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      // try {
      // Invoke the original method without passing req, res, and next explicitly

      const boundMethod = originalMethod.bind(this);
      const result = await boundMethod(req, res, next);

      // Apply requestMiddleware to the result
      if (requestMiddleware.length > 0) {
        for (const middleware of requestMiddleware) {
          await new Promise<void>((resolve, reject) => {
            middleware(req, res, (err: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            });
          }).catch((err) => {
            next(err); // Handle promise rejection errors
          });
        }
      }

      // } catch (error) {
      //   next(error); // Pass error to error handling middleware if an exception occurs
      // }
      // if (result !== undefined) {
      //   const resultString = inspect(result, { depth: null });
      //   return res.json(resultString);
      //   // return res.json(result); // Send JSON response if result is not undefined
      // }

      if (!res.headersSent) {
        // Send JSON response if result is not undefined
        if (result !== undefined) {
          return res.json(result);
        } else {
          return res.status(204).end(); // Return a 204 No Content response if result is undefined
        }
      }
    };

    // Apply requestMiddleware to the route handler
    if (requestMiddleware.length > 0) {
      if (!target.requestMiddleware) {
        target.requestMiddleware = {};
      }

      // Ensure requestMiddleware is an array
      if (!target.requestMiddleware[propertyKey]) {
        target.requestMiddleware[propertyKey] = [];
      }

      // Push requestMiddleware to the array
      target.requestMiddleware[propertyKey].push(...requestMiddleware);
    }

    return descriptor;
  };
}

export { requestHandler };
