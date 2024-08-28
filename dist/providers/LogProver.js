"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
class LoggerProvider {
    constructor() {
        this.logger = (0, pino_1.default)();
    }
    logInfo(message, data) {
        this.logger.info(Object.assign({ message }, data));
    }
    logError(message, error) {
        this.logger.error(Object.assign({ message }, error));
    }
    logDebug(message, data) {
        this.logger.debug(Object.assign({ message }, data));
    }
}
exports.default = LoggerProvider;
