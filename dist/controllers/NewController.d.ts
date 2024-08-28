import { NextFunction, Request, Response } from 'express';
declare class NewController {
    sendMessage(): {
        data: string;
    };
    getSecondNew(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
}
export default NewController;
