#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIApp = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const commander_1 = require("commander");
const figlet = __importStar(require("figlet"));
const templates_1 = __importDefault(require("./templates"));
class CLIApp {
    constructor(serverConfig) {
        this.serverConfig = serverConfig;
        this.program = new commander_1.Command();
        this.routesPath =
            this.serverConfig.routesDir || path.join(process.cwd(), 'routes');
        this.controllersPath =
            this.serverConfig.controllersDir ||
                path.join(process.cwd(), 'controllers');
        this.providersPath =
            this.serverConfig.providersDirs || path.join(process.cwd(), 'providers');
        this.initializeCLI();
    }
    initializeCLI() {
        console.log(figlet.textSync('Simple Express'));
        this.program
            .description('CLI tool to generate code for an Express app')
            .option('-c, --controller <name>', 'Generate a controller')
            // .option('-r, --route <name>', 'Generate a route')
            // .option('-p, --provider <name>', 'Generate a provider')
            // .option('--routes-path <path>', 'Set the routes path', this.routesPath)
            .option('--controllers-path <path>', 'Set the controllers path', this.controllersPath)
            // .option(
            //   '--providers-path <path>',
            //   'Set the providers path',
            //   this.providersPath,
            // )
            .version('1.0.0')
            .parse(process.argv);
    }
    generateFile(templateName, outputPath, data) {
        const templatePath = path.join(__dirname, 'templates', `${templateName}.js`);
        if (!fs.existsSync(templatePath)) {
            console.error(`Template file not found: ${templatePath}`);
            return;
        }
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, (0, templates_1.default)(templateName, data.name));
        console.log(`Generated at ${outputPath}`);
    }
    generateController(name) {
        const outputPath = path.join(this.controllersPath, `${name}.ts`);
        this.generateFile('controller', outputPath, { name });
    }
    generateRoute(name) {
        const outputPath = path.join(this.routesPath, `${name}.js`);
        this.generateFile('route', outputPath, { name });
    }
    generateProvider(name) {
        const outputPath = path.join(this.providersPath, `${name}.ts`);
        this.generateFile('provider', outputPath, { name });
    }
    run() {
        const options = this.program.opts();
        // Set paths from options if provided
        if (options.routesPath) {
            this.routesPath = path.resolve(options.routesPath);
        }
        if (options.controllersPath) {
            this.controllersPath = path.resolve(options.controllersPath);
        }
        if (options.providersPath) {
            this.providersPath = path.resolve(options.providersPath);
        }
        if (options.controller) {
            this.generateController(options.controller);
        }
        //  else if (options.route) {
        //   this.generateRoute(options.route);
        // } else if (options.provider) {
        //   this.generateProvider(options.provider);
        // }
        else {
            console.error('Please provide a valid option');
            this.program.help();
        }
    }
}
exports.CLIApp = CLIApp;
// Run the CLI application
// const cliApp = new CLIApp();
// cliApp.run();
// my-cli-tool --controller MyController --controllers-path ./src/controllers
// my-cli-tool --route myRoute --routes-path ./src/routes
// my-cli-tool --provider MyProvider --providers-path ./src/providers
