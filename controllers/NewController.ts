import { Controller, Get, requestHandler } from '../decorators/RouteHandler';
import { Request, Response } from 'express';
import { UseMiddleware } from '../decorators/UseMiddleware';

@Controller('/api/new')
class NewController {
  @requestHandler((req, res, next) => {
    console.log('New COntroller ');
    next();
  })

  
  @Get('/')
  public sendMessage() {
    const message = { data: 'Hello world' };
    return message;
  }
}
export default NewController;
