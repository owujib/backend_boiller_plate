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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const handlebars = __importStar(require("handlebars"));
const commander_1 = require("commander");
const figlet = __importStar(require("figlet"));
const controller_1 = __importDefault(require("./templates/controller"));
const program = new commander_1.Command();
console.log(figlet.textSync('Simple Express'));
program
    .description('CLI tool to generate code for an Express app')
    .option('-c, --controller <name>', 'Generate a controller')
    .option('-r, --route <path>', 'Generate a route')
    .version('1.0.0')
    .parse(process.argv);
function generateRoute(routePath) {
    const templatePath = path.join(__dirname, 'templates', 'route.hbs');
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateContent);
    const routeCode = template({ path: routePath });
    const filePath = path.join(process.cwd(), 'routes', `${routePath}.js`);
    fs.writeFileSync(filePath, routeCode);
    console.log(`Route ${routePath} generated at ${filePath}`);
}
function generateController(name) {
    const controllerContent = (0, controller_1.default)(name);
    const filePath = path.join(process.cwd(), 'controllers', `${name}Controller.ts`);
    fs.writeFileSync(filePath, controllerContent);
    console.log(`Controller ${name} generated at ${filePath}`);
}
function main() {
    const option = program.opts();
    if (option.controller) {
        generateController(option.controller);
    }
    else if (option.route) {
        generateRoute(option.route);
    }
    else {
        console.error('Please provide a valid option');
        program.help();
    }
}
main();
//# sourceMappingURL=cli.js.map