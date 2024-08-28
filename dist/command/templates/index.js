"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const controller_1 = __importDefault(require("./controller"));
function default_1(type, name) {
    switch (type) {
        case 'controller':
            return (0, controller_1.default)(name);
        // case 'route':
        // case 'provider':
        default:
            throw 'no template';
    }
}
