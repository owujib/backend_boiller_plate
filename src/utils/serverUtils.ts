import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

export function setGlobalErrorHandler(app: express.Application) {
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return next(
      'The route you are looking for has been moved or does not exist',
    );
  });
}
