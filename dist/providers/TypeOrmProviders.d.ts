import { Repository } from 'typeorm';
import { IDatabaseProvider } from '../interface/IDataProvider';
export declare class TypeORMProvider implements IDatabaseProvider {
    private dataSource;
    constructor(config: any);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getRepository<T>(entity: new () => T): Repository<T>;
}
