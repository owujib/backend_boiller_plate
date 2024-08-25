import { IDatabaseProvider } from '../interface/IDataProvider';

import { SequelizeProvider } from '../providers/SequelizeProviders';
import { TypeORMProvider } from '../providers/TypeOrmProviders';

export class DatabaseFactory {
  static create(config: any): IDatabaseProvider {
    switch (config.orm) {
      case 'sequelize':
        return new SequelizeProvider(config);
      case 'typeorm':
        return new TypeORMProvider(config);
      default:
        throw new Error(`Unsupported ORM: ${config.orm}`);
    }
  }
}
