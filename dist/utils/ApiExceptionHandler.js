"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiExceptionHandler extends Error {
    statusCode;
    status;
    error;
    isOperational;
    constructor(message, statusCode, error) {
        super(message);
        this.statusCode = statusCode || 400;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.error = error;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ApiExceptionHandler;
//# sourceMappingURL=ApiExceptionHandler.js.map