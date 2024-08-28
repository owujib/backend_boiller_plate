import { Controller, Get, Post, requestHandler } from '../core';
import { NextFunction, Request, Response, query } from 'express';

@Controller('/api/post')
class PostControllerController {
  @requestHandler()
  @Get('/')
  public sendMessage() {
    const message = { data: 'Hello world' };
    return message;
  }

  @Get('/new')
  public getNew(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json({
      path: req.path,
      page: 'create new',
      query: req.query,
    });
  }

  @requestHandler()
  @Get('/old')
  old() {
    return 'this is old';
  }
}
export default PostControllerController;
