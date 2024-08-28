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
exports.TypeORMProvider = void 0;
// TypeORMProvider.ts
const typeorm_1 = require("typeorm");
class TypeORMProvider {
    constructor(config) {
        this.dataSource = new typeorm_1.DataSource(config);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dataSource.initialize();
                console.log('TypeORM connected successfully.');
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
                yield this.dataSource.destroy();
                console.log('TypeORM disconnected successfully.');
            }
            catch (error) {
                console.error('Unable to disconnect from the database:', error);
                throw error;
            }
        });
    }
    getRepository(entity) {
        return this.dataSource.getRepository(entity);
    }
}
exports.TypeORMProvider = TypeORMProvider;
