"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthProvider {
    constructor(secret) {
        this.secret = secret;
    }
    generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.secret, { expiresIn: '1h' });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, this.secret);
        }
        catch (error) {
            console.error('Invalid token:', error);
            return null;
        }
    }
}
exports.default = AuthProvider;
