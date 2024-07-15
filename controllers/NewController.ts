import { Controller, Get, requestHandler } from '../decorators/RouteHandler';
import { NextFunction, Request, Response } from 'express';
import { UseMiddleware } from '../decorators/UseMiddleware';

const blow = (req: Request, res: Response, next: NextFunction) => {
  console.log('New COntroller ');
  next();
};
@Controller('/api/new')
class NewController {
  @Get('/')
  @requestHandler(blow)
  public sendMessage() {
    const message = { data: 'Hello world' };
    return message;
  }

  @Get('/:id')
  public getSecondNew(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({
      message: req.params.id,
    });
  }
}
export default NewController;
