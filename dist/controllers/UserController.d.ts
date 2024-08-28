import { Logger } from '../services/Logger';
import { NextFunction, Request, Response } from 'express';
declare class UserController {
    private logger;
    constructor(logger: Logger);
    test(): {
        id: number;
        name: string;
    };
    bro(): {
        id: number;
        name: string;
    };
    uploadLocal(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    getYellow(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
}
export default UserController;
