module.exports = function controllerTemplate (name) {
  return `import { Controller, Get, requestHandler } from 'express-custom-template';
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

