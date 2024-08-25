"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadHelper = exports.uploadFileHandler = void 0;
const multer_1 = __importDefault(require("multer"));
const ApiExceptionHandler_1 = __importDefault(require("../utils/ApiExceptionHandler"));
// import Helper from "../helpers";
// import { uploadHandlerType } from "../types";
const HttpStatus_1 = __importDefault(require("../utils/HttpStatus"));
let storage = multer_1.default.memoryStorage();
function uploadFileHandler({ fields, validationFunction, limit }) {
    return function (_target, _propertyKey, descriptor) {
        const upload = (0, multer_1.default)({
            storage: storage,
            fileFilter: validationFunction,
            limits: {
                fileSize: limit,
            },
        });
        const originalMethod = descriptor.value;
        descriptor.value = function (req, res, next) {
            upload.any()(req, res, (err) => {
                if (err instanceof multer_1.default.MulterError) {
                    throw new ApiExceptionHandler_1.default("Request File Error", HttpStatus_1.default.BAD_REQUEST, err);
                }
                else if (err) {
                    throw new ApiExceptionHandler_1.default("Server error", HttpStatus_1.default.BAD_REQUEST, err);
                }
                return originalMethod.call(this, req, res, next);
            });
        };
    };
}
exports.uploadFileHandler = uploadFileHandler;
const uploadHelper = ({ validationFunction, fields, limit }) => {
    const upload = (0, multer_1.default)({
        storage: storage,
        fileFilter: validationFunction,
        limits: {
            fileSize: limit,
        },
    });
    return upload.fields(fields);
};
exports.uploadHelper = uploadHelper;
//# sourceMappingURL=FileHandler.js.map