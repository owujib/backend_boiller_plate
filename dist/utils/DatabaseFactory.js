"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseFactory = void 0;
const SequelizeProviders_1 = require("../providers/SequelizeProviders");
const TypeOrmProviders_1 = require("../providers/TypeOrmProviders");
class DatabaseFactory {
    static create(config) {
        switch (config.orm) {
            case 'sequelize':
                return new SequelizeProviders_1.SequelizeProvider(config);
            case 'typeorm':
                return new TypeOrmProviders_1.TypeORMProvider(config);
            default:
                throw new Error(`Unsupported ORM: ${config.orm}`);
        }
    }
}
exports.DatabaseFactory = DatabaseFactory;
