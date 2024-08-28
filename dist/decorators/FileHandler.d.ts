export declare function uploadFileHandler({ fields, validationFunction, limit }: any): (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const uploadHelper: ({ validationFunction, fields, limit }: any) => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
