"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kernelConfig = void 0;
const path_1 = __importDefault(require("path"));
exports.kernelConfig = {
    controllersDir: path_1.default.join(__dirname, '../controllers'),
    routesDir: path_1.default.join(__dirname, '../routes'),
    providersDirs: '',
};
