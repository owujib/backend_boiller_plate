import { Sequelize } from 'sequelize';
declare class DatabaseProvider {
    private sequelize;
    constructor(connectionString: string);
    connect(): Promise<void>;
    getSequelizeInstance(): Sequelize;
}
export default DatabaseProvider;
