import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { RouteTypeInterface } from './decorators/RouteHandler';
interface KernelOptions {
    controllersPath?: string;
    routesPath?: string;
    viewsPath?: string;
}
export declare class Kernel {
    app: express.Application;
    routesDir: string;
    controllersDir: string;
    constructor(options?: KernelOptions);
    middlewares(): void;
    webhooks(): void;
    routes(): void;
    errorHandler(): void;
    loadRoutes(): void;
    loadControllers(): void;
    responseInterceptor(req: Request, res: Response, next: NextFunction): void;
    existInRoutes(propertyKey: string, arr: RouteTypeInterface[]): {
        payload: RouteTypeInterface | null;
        index: number;
    };
}
export {};
