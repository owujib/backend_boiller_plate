import 'reflect-metadata';
type ControllerDecorator = (basePath: string) => ClassDecorator;
export declare const Controller: ControllerDecorator;
export interface RouteTypeInterface {
    path: string;
    method: string;
    key: string;
}
export declare const Get: (path: string) => MethodDecorator;
export declare const Post: (path: string) => MethodDecorator;
export declare const Put: (path: string) => MethodDecorator;
export declare const Patch: (path: string) => MethodDecorator;
export declare const Delete: (path: string) => MethodDecorator;
declare function requestHandler(...requestMiddleware: any[]): MethodDecorator;
export { requestHandler };
