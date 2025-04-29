import { Controller, Get, requestHandler } from '../decorators/RouteHandler';
import { Request, Response } from 'express';

@Controller('/api/${name.toLowerCase()}')
class UserController {
  @requestHandler()
  @Get('/')
  public sendMessage() {
    const message = { data: 'Hello world' };
    return message;
  }
}
export default UserController;