import { Router, RequestHandler } from 'express';

class RouteBuilder {
  private router: Router;
  private currentPrefix: string = '';

  constructor() {
    this.router = Router();
  }

  static create(): RouteBuilder {
    return new RouteBuilder();
  }

  prefix(prefix: string): this {
    this.currentPrefix = prefix;
    return this;
  }

  middleware(middleware: RequestHandler): this {
    this.router.use(this.currentPrefix, middleware);
    return this;
  }

  get(path: string, handler: RequestHandler): this {
    this.router.get(this.currentPrefix + path, handler);
    return this;
  }

  post(path: string, handler: RequestHandler): this {
    this.router.post(this.currentPrefix + path, handler);
    return this;
  }

  put(path: string, handler: RequestHandler): this {
    this.router.put(this.currentPrefix + path, handler);
    return this;
  }

  delete(path: string, handler: RequestHandler): this {
    this.router.delete(this.currentPrefix + path, handler);
    return this;
  }

  patch(path: string, handler: RequestHandler): this {
    this.router.patch(this.currentPrefix + path, handler);
    return this;
  }

  group(callback: (router: RouteBuilder) => void): this {
    const groupRouter = new RouteBuilder();
    groupRouter.currentPrefix = this.currentPrefix;
    callback(groupRouter);
    this.router.use(this.currentPrefix, groupRouter.build());
    return this;
  }

  build(): Router {
    return this.router;
  }

  export() {
    return this.router;
  }
}

export default RouteBuilder.create();
