"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    // destination: (req: Request, file: Express.Multer.File, cb: any) => {
    //   cb(null, "uploads/");
    // },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    },
});
exports.upload = (0, multer_1.default)({ storage });
class LocalUploadService {
    static uploadMiddleware() {
        return exports.upload.single("file");
    }
    static handleUpload(file) {
        return { message: "File uploaded locally", file };
    }
}
exports.default = LocalUploadService;
