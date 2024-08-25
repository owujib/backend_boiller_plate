"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseMiddleware = void 0;
function UseMiddleware(...middleware) {
    return function (target, propertyKey, descriptor) {
        // If propertyKey is present, it's a method-level decorator
        if (propertyKey) {
            if (!target.middleware) {
                target.middleware = {};
            }
            // Ensure middleware is an array
            if (!target.middleware[propertyKey]) {
                target.middleware[propertyKey] = [];
            }
            // Push middleware to the array
            target.middleware[propertyKey].push(...(Array.isArray(middleware) ? middleware : [middleware]));
        }
        else {
            // If propertyKey is not present, it's a class-level decorator
            if (!target.prototype.constructor.middleware) {
                target.prototype.constructor.middleware = [];
            }
            // Ensure middleware is an array
            if (!Array.isArray(target.prototype.constructor.middleware)) {
                target.prototype.constructor.middleware = [];
            }
            // Push middleware to the array
            target.prototype.constructor.middleware.push(...(Array.isArray(middleware) ? middleware : [middleware]));
        }
    };
}
exports.UseMiddleware = UseMiddleware;
//# sourceMappingURL=UseMiddleware.js.map