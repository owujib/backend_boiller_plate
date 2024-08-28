"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ViewEngineProvider {
    static setupViewEngine(app, viewsDir) {
        app.set('views', viewsDir);
        app.set('view engine', 'pug');
    }
}
exports.default = ViewEngineProvider;
