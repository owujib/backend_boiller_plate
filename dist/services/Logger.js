"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const pino_1 = __importDefault(require("pino"));
class Logger {
    constructor() {
        this.logger = (0, pino_1.default)({
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true, // Colorize the output for better readability
                    translateTime: "SYS:standard", // Translate timestamp to local time
                    ignore: "pid,hostname", // Ignore these fields
                },
            },
            level: process.env.NODE_ENV === "development" ? "debug" : "info",
        });
    }
    info(message, ...args) {
        this.logger.info(message, ...args);
    }
    warn(message, ...args) {
        this.logger.warn(message, ...args);
    }
    error(message, ...args) {
        this.logger.error(message, ...args);
    }
    debug(message, ...args) {
        this.logger.debug(message, ...args);
    }
    verbose(message, ...args) {
        this.logger.trace(message, ...args);
    }
}
exports.Logger = Logger;
exports.default = new Logger();
