import { Express } from 'express';
declare class MiddlewareProvider {
    static applyMiddleware(app: Express): void;
}
export default MiddlewareProvider;
