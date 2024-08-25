import * as path from 'path';

interface ServerConfigOptions {
  routesDir: string;
  controllersDir: string;
  viewsDir?: string; // Optional: You can add more directories as needed
}

class ServerConfigProvider {
  private config: ServerConfigOptions;

  constructor(options: ServerConfigOptions) {
    this.config = {
      routesDir: path.resolve(options.routesDir),
      controllersDir: path.resolve(options.controllersDir),
      viewsDir: options.viewsDir ? path.resolve(options.viewsDir) : undefined,
    };
  }

  public getRoutesDir(): string {
    return this.config.routesDir;
  }

  public getControllersDir(): string {
    return this.config.controllersDir;
  }

  public getViewsDir(): string | undefined {
    return this.config.viewsDir;
  }

  // You can add more methods to manage other con       figurations
}

export default ServerConfigProvider;
