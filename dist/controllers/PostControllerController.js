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
Object.defineProperty(exports, "__esModule", { value: true });
const RouteHandler_1 = require("../decorators/RouteHandler");
let PostControllerController = class PostControllerController {
    sendMessage() {
        const message = { data: 'Hello world' };
        return message;
    }
    getNew(req, res, next) {
        return res.status(200).json({
            path: req.path,
            page: 'create new',
            query: req.query,
        });
    }
    old() {
        return 'this is old';
    }
};
__decorate([
    (0, RouteHandler_1.requestHandler)(),
    (0, RouteHandler_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostControllerController.prototype, "sendMessage", null);
__decorate([
    (0, RouteHandler_1.Get)('/new'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], PostControllerController.prototype, "getNew", null);
__decorate([
    (0, RouteHandler_1.requestHandler)(),
    (0, RouteHandler_1.Get)('/old'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostControllerController.prototype, "old", null);
PostControllerController = __decorate([
    (0, RouteHandler_1.Controller)('/api/postcontroller')
], PostControllerController);
exports.default = PostControllerController;
