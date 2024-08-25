import {
  Controller,
  Get,
  Post,
  requestHandler,
} from '../decorators/RouteHandler';
import { UseMiddleware } from '../decorators/UseMiddleware';
import LocalUploadService from '../services/LocalUploadService';
import { Logger } from '../services/Logger';
import { NextFunction, Request, Response } from 'express';

function customMiddleware(
  req: Request,
  res: Response,
  done: (err?: any) => void,
  // next: NextFunction,
) {
  // Perform actions before executing the route handler
  console.log('Custom Middleware: Before executing route handler');
  // You can add your custom middleware logic here
  done(); // Call done to proceed to next middleware or handler
}
function anotherCustomMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Perform actions before executing the route handler
  console.log('Another Custom Middleware: Before executing route handler');
  // You can add your custom middleware logic here
  next();
}

@Controller('/api')
// @UseMiddleware(function anotherCustomHere(req, res, next) {
//   console.log('COntroller middleware');
//   return next();
// })
class UserController {
  constructor(private logger: Logger) {}
  @Get('/test')
  @UseMiddleware(anotherCustomMiddleware)
  @requestHandler(customMiddleware)
  public test() {
    const user = { id: 1, name: 'John Doe' };

    return user;
  }
  @Get('/bro')
  @requestHandler()
  public bro() {
    const user = { id: 1, name: 'John Bro' };
    return user;
  }

  @Post('/upload/local')
  // @requestHandler(LocalUploadService.uploadMiddleware())
  @UseMiddleware(LocalUploadService.uploadMiddleware(), anotherCustomMiddleware)
  public async uploadLocal(req: Request, res: Response, next: NextFunction) {
    console.log(req.file);
    const result = LocalUploadService.handleUpload((<any>req).file);
    return res.status(200).json(result);
  }

  @Get('/yellow')
  public getYellow(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({ message: 'beans' });
  }
}

export default UserController;
