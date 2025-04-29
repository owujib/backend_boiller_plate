export * from './kernel';
// import cli from './command/cli';
// import Logger from './services/Logger';

// const PORT = Kernel.get('PORT');

// Kernel.listen(Kernel.get('PORT'), () => {
//   Logger.info(`server is runing on PORT localhost:${PORT}`);
// });

// export const commands = cli;
export * from './decorators';
export * from './providers';
export * from './utils'

  // "bin": {
  //   "simple-express": "./dist/command/cli.js", 
  //  "kernel-init": "./bin/index.js"
  // }