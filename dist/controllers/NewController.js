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
const blow = (req, res, next) => {
    console.log('New COntroller ');
    next();
};
let NewController = class NewController {
    sendMessage() {
        const message = { data: 'Hello world' };
        return message;
    }
    getSecondNew(req, res, next) {
        return res.status(200).json({
            message: req.params.id,
        });
    }
};
__decorate([
    (0, RouteHandler_1.Get)('/'),
    (0, RouteHandler_1.requestHandler)(blow),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewController.prototype, "sendMessage", null);
__decorate([
    (0, RouteHandler_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], NewController.prototype, "getSecondNew", null);
NewController = __decorate([
    (0, RouteHandler_1.Controller)('/api/new')
], NewController);
exports.default = NewController;
//# sourceMappingURL=NewController.js.map