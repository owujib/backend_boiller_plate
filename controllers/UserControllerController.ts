import { Controller, Get, requestHandler } from '../decorators/RouteHandler';
import { UseMiddleware } from '../decorators/UseMiddleware';
import BaseController from './BaseController';
import { NextFunction, Request, Response } from 'express';

function customMiddleware(req: Request, res: Response, next: NextFunction) {
  // Perform actions before executing the route handler
  console.log('Custom Middleware: Before executing route handler');
  // You can add your custom middleware logic here
  next();
}

@Controller('/api')
// @UseMiddleware(function anotherCustomHere(req, res, next) {
//   console.log('COntroller middleware');
//   return next();
// })
class UserControllerController {
  @Get('/home')
  @requestHandler(customMiddleware)
  public test() {
    const user = { id: 1, name: 'John Doe' };

    return user;
  }
  @Get('/bro')
  @requestHandler()
  public another(a: Request) {
    const user = { id: 1, name: 'John Bro' };

    return res.status(201).json(user)
  }
}

export default UserControllerController;
