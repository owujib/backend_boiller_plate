#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const controllerTemplate = require('./command/templates/controller');

console.log(controllerTemplate)

const foldersToCreate = [
  'src',
  'src/controllers',
  'src/routes'
];

foldersToCreate.forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
    console.log(`✅ Created: ${folder}`);
  }
});

const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');
if (!fs.existsSync(tsConfigPath)) {
  fs.writeFileSync(tsConfigPath, JSON.stringify({
    compilerOptions: {
      target: "ES6",
      module: "commonjs",
      outDir: "./dist",
      rootDir: "./src",
      strict: true,
      esModuleInterop: true
    }
  }, null, 2));
  console.log(`✅ Generated: tsconfig.json`);
}

// Generate UserController.ts
const userControllerPath = path.join(process.cwd(), 'src/controllers/UserController.ts');
if (!fs.existsSync(userControllerPath)) {
  const content = controllerTemplate('User');
  fs.writeFileSync(userControllerPath, content);
  console.log(`✅ Generated: src/controllers/UserController.ts`);
}
