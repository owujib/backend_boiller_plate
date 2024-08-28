import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { RouteTypeInterface } from './decorators/RouteHandler';
import { IServerConfig } from './interface/IServerConfig';
declare class Kernel {
    private config;
    app: express.Application;
    constructor(config: IServerConfig);
    private middlewares;
    errorHandler(): void;
    setMiddleware(app: express.Application): void;
    loadRoutes(): void;
    loadControllers(): void;
    responseInterceptor(req: Request, res: Response, next: NextFunction): void;
    existInRoutes(propertyKey: string, arr: RouteTypeInterface[]): {
        payload: RouteTypeInterface | null;
        index: number;
    };
}
export default Kernel;
