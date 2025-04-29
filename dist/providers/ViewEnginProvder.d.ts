import { Express } from 'express';
declare class ViewEngineProvider {
    static setupViewEngine(app: Express, viewsDir: string): void;
}
export default ViewEngineProvider;
