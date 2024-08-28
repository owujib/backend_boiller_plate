"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = exports.Controller = void 0;
exports.requestHandler = requestHandler;
require("reflect-metadata");
const Controller = (basePath) => {
    return (target) => {
        target.prototype.basePath = basePath;
        return target;
    };
};
exports.Controller = Controller;
function createRouteDecorator(method) {
    return (path) => {
        return (target, key, descriptor) => {
            const routes = target.routes || [];
            routes.push({ path, method, key: key.toString() });
            target.routes = routes;
            return descriptor;
        };
    };
}
exports.Get = createRouteDecorator('GET');
exports.Post = createRouteDecorator('POST');
exports.Put = createRouteDecorator('PUT');
exports.Patch = createRouteDecorator('PATCH');
exports.Delete = createRouteDecorator('DELETE');
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
function requestHandler(...requestMiddleware) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                // try {
                // Invoke the original method without passing req, res, and next explicitly
                const boundMethod = originalMethod.bind(this);
                const result = yield boundMethod(req, res, next);
                // Apply requestMiddleware to the result
                if (requestMiddleware.length > 0) {
                    for (const middleware of requestMiddleware) {
                        yield new Promise((resolve, reject) => {
                            middleware(req, res, (err) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
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
                    }
                    else {
                        return res.status(204).end(); // Return a 204 No Content response if result is undefined
                    }
                }
            });
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
