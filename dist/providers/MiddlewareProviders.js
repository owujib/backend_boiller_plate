"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
class MiddlewareProvider {
    static applyMiddleware(app) {
        app.use((0, cors_1.default)());
        app.use((0, morgan_1.default)('combined'));
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
    }
}
exports.default = MiddlewareProvider;
