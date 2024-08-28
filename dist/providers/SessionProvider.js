"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_session_1 = __importDefault(require("express-session"));
class SessionProvider {
    static setupSession(app) {
        app.use((0, express_session_1.default)({
            secret: 'your-secret-key',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }, // Set to true if using HTTPS
        }));
    }
}
exports.default = SessionProvider;
