"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kernel_1 = __importDefault(require("./kernel"));
const Logger_1 = __importDefault(require("./services/Logger"));
const app = new kernel_1.default().app;
const PORT = app.get('PORT');
app.listen(PORT, () => {
    Logger_1.default.info(`server is runing on PORT localhost:${PORT}`);
});
