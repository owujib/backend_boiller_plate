"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalErrorHandler = setGlobalErrorHandler;
function setGlobalErrorHandler(app) {
    app.all('*', (req, res, next) => {
        return next('The route you are looking for has been moved or does not exist');
    });
}
