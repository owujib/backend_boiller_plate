"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeProvider = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
class SequelizeProvider {
    constructor(config) {
        this.sequelize = new sequelize_typescript_1.Sequelize(config);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.authenticate();
                console.log('Sequelize connected successfully.');
            }
            catch (error) {
                console.error('Unable to connect to the database:', error);
                throw error;
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sequelize.close();
                console.log('Sequelize disconnected successfully.');
            }
            catch (error) {
                console.error('Unable to disconnect from the database:', error);
                throw error;
            }
        });
    }
    getRepository(entity) {
        return this.sequelize.getRepository(entity);
    }
}
exports.SequelizeProvider = SequelizeProvider;
