import 'reflect-metadata';
import {
  Request,
  Response,
  NextFunction,
  RequestHandler as ExpressRequestHandler,
} from 'express';

type ControllerDecorator = (basePath: string) => ClassDecorator;

export const Controller: ControllerDecorator = (basePath: string) => {
  return (target: any) => {
    target.prototype.basePath = basePath;
    return target;
  };
};

function createRouteDecorator(method: string) {
  return (path: string): MethodDecorator => {
    return (
      target: any,
      key: string | symbol,
      descriptor: PropertyDescriptor,
    ) => {
      const routes = target.routes || [];
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

function requestHandler(
  ...middleware: ExpressRequestHandler[]
): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      try {
        // Invoke the original method without passing req, res, and next explicitly
        const result = originalMethod.call(this);

        if (
          result &&
          typeof result.then === 'function' &&
          typeof result.catch === 'function'
        ) {
          // If the result is a Promise, handle it accordingly
          result
            .then((data: any) => {
              res.json(data); // Send JSON response if Promise resolves
            })
            .catch((error: any) => {
              next(error); // Pass error to error handling middleware if Promise rejects
            });
        } else if (result !== undefined) {
          res.json(result); // Send JSON response if result is not undefined
        } else if (result instanceof Response) {
          result;
        }
      } catch (error) {
        next(error); // Pass error to error handling middleware if an exception occurs
      }
    };

    // Apply middleware to the route handler
    if (middleware.length > 0) {
      if (!target.middleware) {
        target.middleware = {};
      }

      // Ensure middleware is an array
      if (!target.middleware[propertyKey]) {
        target.middleware[propertyKey] = [];
      }

      // Push middleware to the array
      target.middleware[propertyKey].push(
        ...(Array.isArray(middleware) ? middleware : [middleware]),
      );
    }

    return descriptor.value;
  };
}

export { requestHandler };
