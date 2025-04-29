interface ServerConfigOptions {
    routesDir: string;
    controllersDir: string;
    viewsDir?: string;
}
declare class ServerConfigProvider {
    private config;
    constructor(options: ServerConfigOptions);
    getRoutesDir(): string;
    getControllersDir(): string;
    getViewsDir(): string | undefined;
}
export default ServerConfigProvider;
