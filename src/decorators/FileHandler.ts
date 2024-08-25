import { NextFunction, Request, Response, Express } from "express";
import multer, { Multer } from "multer";
import ApiError from "../utils/ApiExceptionHandler";
// import Helper from "../helpers";
// import { uploadHandlerType } from "../types";
import HttpStatus from "../utils/HttpStatus";

let storage = multer.memoryStorage();

export function uploadFileHandler({ fields, validationFunction, limit }: any) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const upload = multer({
      storage: storage,
      fileFilter: validationFunction,
      limits: {
        fileSize: limit,
      },
    });
    const originalMethod = descriptor.value;
    descriptor.value = function (
      req: Request,
      res: Response,
      next: NextFunction,
    ) {
      upload.any()(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
          throw new ApiError("Request File Error", HttpStatus.BAD_REQUEST, err);
        } else if (err) {
          throw new ApiError("Server error", HttpStatus.BAD_REQUEST, err);
        }

        return originalMethod.call(this, req, res, next);
      });
    };
  };
}

export const uploadHelper = ({ validationFunction, fields, limit }: any) => {
  const upload = multer({
    storage: storage,
    fileFilter: validationFunction,
    limits: {
      fileSize: limit,
    },
  });

  return upload.fields(fields);
};
