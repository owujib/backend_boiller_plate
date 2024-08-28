import { NextFunction, Request, Response } from 'express';
declare class PostControllerController {
    sendMessage(): {
        data: string;
    };
    getNew(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
    old(): string;
}
export default PostControllerController;
