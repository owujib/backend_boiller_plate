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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./kernel"), exports);
// import cli from './command/cli';
// import Logger from './services/Logger';
// const PORT = Kernel.get('PORT');
// Kernel.listen(Kernel.get('PORT'), () => {
//   Logger.info(`server is runing on PORT localhost:${PORT}`);
// });
// export const commands = cli;
__exportStar(require("./decorators"), exports);
__exportStar(require("./providers"), exports);
__exportStar(require("./utils"), exports);
// "bin": {
//   "simple-express": "./dist/command/cli.js", 
//  "kernel-init": "./bin/index.js"
// }
//# sourceMappingURL=index.js.map