#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { Command } from 'commander';
import * as figlet from 'figlet';
import { IServerConfig } from '../interface/IServerConfig';
import templateGenerator from './templates';

export class CLIApp {
  private program: Command;
  private routesPath: string;
  private controllersPath: string;
  private providersPath: string;

  constructor(private serverConfig: IServerConfig) {
    this.program = new Command();
    this.routesPath =
      this.serverConfig.routesDir || path.join(process.cwd(), 'routes');
    this.controllersPath =
      this.serverConfig.controllersDir ||
      path.join(process.cwd(), 'controllers');
    this.providersPath =
      this.serverConfig.providersDirs || path.join(process.cwd(), 'providers');
    this.initializeCLI();
  }

  private initializeCLI() {
    console.log(figlet.textSync('Simple Express'));

    this.program
      .description('CLI tool to generate code for an Express app')
      .option('-c, --controller <name>', 'Generate a controller')
      // .option('-r, --route <name>', 'Generate a route')
      // .option('-p, --provider <name>', 'Generate a provider')
      // .option('--routes-path <path>', 'Set the routes path', this.routesPath)
      .option(
        '--controllers-path <path>',
        'Set the controllers path',
        this.controllersPath,
      )
      // .option(
      //   '--providers-path <path>',
      //   'Set the providers path',
      //   this.providersPath,
      // )
      .version('1.0.0')
      .parse(process.argv);
  }

  private generateFile(
    templateName: 'controller' | 'route' | 'provider',
    outputPath: string,
    data: { name: string },
  ) {
    const templatePath = path.join(
      __dirname,
      'templates',
      `${templateName}.js`,
    );
    if (!fs.existsSync(templatePath)) {
      console.error(`Template file not found: ${templatePath}`);
      return;
    }

    const templateContent = fs.readFileSync(templatePath, 'utf8');

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, templateGenerator(templateName, data.name));

    console.log(`Generated at ${outputPath}`);
  }

  private generateController(name: string) {
    const outputPath = path.join(this.controllersPath, `${name}.ts`);
    this.generateFile('controller', outputPath, { name });
  }

  private generateRoute(name: string) {
    const outputPath = path.join(this.routesPath, `${name}.js`);
    this.generateFile('route', outputPath, { name });
  }

  private generateProvider(name: string) {
    const outputPath = path.join(this.providersPath, `${name}.ts`);
    this.generateFile('provider', outputPath, { name });
  }

  public run() {
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

// Run the CLI application
// const cliApp = new CLIApp();
// cliApp.run();

// my-cli-tool --controller MyController --controllers-path ./src/controllers
// my-cli-tool --route myRoute --routes-path ./src/routes
// my-cli-tool --provider MyProvider --providers-path ./src/providers
