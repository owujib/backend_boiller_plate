import multer from "multer";
import path from "path";
import { Express, Request, Response, NextFunction } from "express";

const storage = multer.diskStorage({
  // destination: (req: Request, file: Express.Multer.File, cb: any) => {
  //   cb(null, "uploads/");
  // },
  filename: (req: Request, file: Express.Multer.File, cb: any) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

class LocalUploadService {
  static uploadMiddleware() {
    return upload.single("file");
  }

  static handleUpload(file: Express.Multer.File) {
    return { message: "File uploaded locally", file };
  }
}

export default LocalUploadService;
