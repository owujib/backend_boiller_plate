"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMProvider = void 0;
// TypeORMProvider.ts
const typeorm_1 = require("typeorm");
class TypeORMProvider {
    dataSource;
    constructor(config) {
        this.dataSource = new typeorm_1.DataSource(config);
    }
    async connect() {
        try {
            await this.dataSource.initialize();
            console.log('TypeORM connected successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    }
    async disconnect() {
        try {
            await this.dataSource.destroy();
            console.log('TypeORM disconnected successfully.');
        }
        catch (error) {
            console.error('Unable to disconnect from the database:', error);
            throw error;
        }
    }
    getRepository(entity) {
        return this.dataSource.getRepository(entity);
    }
}
exports.TypeORMProvider = TypeORMProvider;
//# sourceMappingURL=TypeOrmProviders.js.map