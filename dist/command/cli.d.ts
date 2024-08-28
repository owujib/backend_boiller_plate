#!/usr/bin/env node
import { IServerConfig } from '../interface/IServerConfig';
export declare class CLIApp {
    private serverConfig;
    private program;
    private routesPath;
    private controllersPath;
    private providersPath;
    constructor(serverConfig: IServerConfig);
    private initializeCLI;
    private generateFile;
    private generateController;
    private generateRoute;
    private generateProvider;
    run(): void;
}
