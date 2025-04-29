"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class DatabaseProvider {
    sequelize;
    constructor(connectionString) {
        this.sequelize = new sequelize_1.Sequelize(connectionString);
    }
    async connect() {
        try {
            await this.sequelize.authenticate();
            console.log('Database connection established.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    getSequelizeInstance() {
        return this.sequelize;
    }
}
exports.default = DatabaseProvider;
//# sourceMappingURL=DatabaseProviders.js.map