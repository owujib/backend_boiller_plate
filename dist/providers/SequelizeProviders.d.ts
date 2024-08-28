import { IDatabaseProvider } from '../interface/IDataProvider';
export declare class SequelizeProvider implements IDatabaseProvider {
    private sequelize;
    constructor(config: any);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getRepository<T>(entity: new () => T): any;
}
