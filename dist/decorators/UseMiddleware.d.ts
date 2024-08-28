import { RequestHandler } from 'express';
export declare function UseMiddleware(...middleware: RequestHandler[]): (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) => void;
