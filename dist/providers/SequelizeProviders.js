"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeProvider = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
class SequelizeProvider {
    sequelize;
    constructor(config) {
        this.sequelize = new sequelize_typescript_1.Sequelize(config);
    }
    async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Sequelize connected successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }
    async disconnect() {
        try {
            await this.sequelize.close();
            console.log('Sequelize disconnected successfully.');
        }
        catch (error) {
            console.error('Unable to disconnect from the database:', error);
            throw error;
        }
    }
    getRepository(entity) {
        return this.sequelize.getRepository(entity);
    }
}
exports.SequelizeProvider = SequelizeProvider;
//# sourceMappingURL=SequelizeProviders.js.map