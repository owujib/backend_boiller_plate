"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function controllerTemplate(name) {
    return `import { Controller, Get, requestHandler } from '../decorators/RouteHandler';
import { Request, Response } from 'express';

@Controller('/api/${name.toLowerCase()}')
class ${name}Controller {
  @requestHandler()
  @Get('/')
  public sendMessage() {
    const message = {data: 'Hello world'};
    return message;
  }
}
export default ${name}Controller;
`;
}
exports.default = controllerTemplate;
//# sourceMappingURL=controller.js.map