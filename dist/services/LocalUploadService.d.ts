import multer from "multer";
export declare const upload: multer.Multer;
declare class LocalUploadService {
    static uploadMiddleware(): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    static handleUpload(file: Express.Multer.File): {
        message: string;
        file: Express.Multer.File;
    };
}
export default LocalUploadService;
