import { Controller, Get, requestHandler } from '../decorators/RouteHandler';
import { NextFunction, Request, Response } from 'express';
import { UseMiddleware } from '../decorators/UseMiddleware';

@Controller('/api/new')
class TestController {}
export default TestController;
