import { Express } from 'express';

class ViewEngineProvider {
  public static setupViewEngine(app: Express, viewsDir: string): void {
    app.set('views', viewsDir);
    app.set('view engine', 'pug');
  }
}

export default ViewEngineProvider;
