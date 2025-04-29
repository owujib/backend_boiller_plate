"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const kernel_1 = require("./kernel");
new kernel_1.Kernel({
    controllersPath: path_1.default.join(__dirname, 'controllers'),
    routesPath: path_1.default.join(__dirname, 'routes'),
}).app.listen(3000, () => {
    console.log('lol');
});
//# sourceMappingURL=test.js.map