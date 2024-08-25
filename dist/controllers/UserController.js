"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RouteHandler_1 = require("../decorators/RouteHandler");
const UseMiddleware_1 = require("../decorators/UseMiddleware");
const LocalUploadService_1 = __importDefault(require("../services/LocalUploadService"));
const Logger_1 = require("../services/Logger");
function customMiddleware(req, res, done) {
    // Perform actions before executing the route handler
    console.log('Custom Middleware: Before executing route handler');
    // You can add your custom middleware logic here
    done(); // Call done to proceed to next middleware or handler
}
function anotherCustomMiddleware(req, res, next) {
    // Perform actions before executing the route handler
    console.log('Another Custom Middleware: Before executing route handler');
    // You can add your custom middleware logic here
    next();
}
let UserController = class UserController {
    constructor(logger) {
        this.logger = logger;
    }
    test() {
        const user = { id: 1, name: 'John Doe' };
        return user;
    }
    bro() {
        const user = { id: 1, name: 'John Bro' };
        return user;
    }
    uploadLocal(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.file);
            const result = LocalUploadService_1.default.handleUpload(req.file);
            return res.status(200).json(result);
        });
    }
    getYellow(req, res, next) {
        return res.status(200).json({ message: 'beans' });
    }
};
__decorate([
    (0, RouteHandler_1.Get)('/test'),
    (0, UseMiddleware_1.UseMiddleware)(anotherCustomMiddleware),
    (0, RouteHandler_1.requestHandler)(customMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "test", null);
__decorate([
    (0, RouteHandler_1.Get)('/bro'),
    (0, RouteHandler_1.requestHandler)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "bro", null);
__decorate([
    (0, RouteHandler_1.Post)('/upload/local')
    // @requestHandler(LocalUploadService.uploadMiddleware())
    ,
    (0, UseMiddleware_1.UseMiddleware)(LocalUploadService_1.default.uploadMiddleware(), anotherCustomMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadLocal", null);
__decorate([
    (0, RouteHandler_1.Get)('/yellow'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getYellow", null);
UserController = __decorate([
    (0, RouteHandler_1.Controller)('/api')
    // @UseMiddleware(function anotherCustomHere(req, res, next) {
    //   console.log('COntroller middleware');
    //   return next();
    // })
    ,
    __metadata("design:paramtypes", [Logger_1.Logger])
], UserController);
exports.default = UserController;
//# sourceMappingURL=UserController.js.map