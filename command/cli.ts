#!/usr/bin/env node


import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { Command } from 'commander';
import * as figlet from 'figlet';
import controllerTemplate from './templates/controller';
const program = new Command();

console.log(figlet.textSync('Simple Express'));

program
  .description('CLI tool to generate code for an Express app')
  .option('-c, --controller <name>', 'Generate a controller')
  .option('-r, --route <path>', 'Generate a route')
  .version('1.0.0')
  .parse(process.argv);

function generateRoute(routePath: string) {
  const templatePath = path.join(__dirname, 'templates', 'route.hbs');
  const templateContent = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(templateContent);
  const routeCode = template({ path: routePath });

  const filePath = path.join(process.cwd(), 'routes', `${routePath}.js`);
  fs.writeFileSync(filePath, routeCode);

  console.log(`Route ${routePath} generated at ${filePath}`);
}

function generateController(name: string) {
  const controllerContent = controllerTemplate(name);
  const filePath = path.join(
    process.cwd(),
    'controllers',
    `${name}Controller.ts`,
  );
  fs.writeFileSync(filePath, controllerContent);

  console.log(`Controller ${name} generated at ${filePath}`);
}

function main() {
  const option = program.opts();
  if (option.controller) {
    generateController(option.controller);
  } else if (option.route) {
    generateRoute(option.route);
  } else {
    console.error('Please provide a valid option');
    program.help();
  }
}

main();
