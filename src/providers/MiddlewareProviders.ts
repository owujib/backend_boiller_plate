import express, { Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

class MiddlewareProvider {
  public static applyMiddleware(app: Express): void {
    app.use(cors());
    app.use(morgan('combined'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}

export default MiddlewareProvider;
