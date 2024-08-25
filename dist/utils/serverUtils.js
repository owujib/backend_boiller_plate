"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGlobalErrorHandler = exports.setRoutes = exports.setGlobalMiddlewares = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
function setGlobalMiddlewares(app) {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cors_1.default)());
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
}
exports.setGlobalMiddlewares = setGlobalMiddlewares;
function setRoutes(app) {
    app.get('/', (req, res, next) => {
        res.status(200).json({ message: 'hello' });
    });
}
exports.setRoutes = setRoutes;
function setGlobalErrorHandler(app) {
    app.all('*', (req, res, next) => {
        return next('The route you are looking for has been moved or does not exist');
    });
}
exports.setGlobalErrorHandler = setGlobalErrorHandler;
//# sourceMappingURL=serverUtils.js.map