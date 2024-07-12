import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';

export function setGlobalMiddlewares(app: express.Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, '../../public')));
}

export function setRoutes(app: express.Application) {
  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'hello' });
  });
}

export function setGlobalErrorHandler(app: express.Application) {
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return next(
      'The route you are looking for has been moved or does not exist',
    );
  });
}
