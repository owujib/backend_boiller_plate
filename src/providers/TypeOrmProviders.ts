// TypeORMProvider.ts
import { DataSource, Repository } from 'typeorm';
import { IDatabaseProvider } from '../interface/IDataProvider';
 
export class TypeORMProvider implements IDatabaseProvider {
  private dataSource: DataSource;

  constructor(config: any) {
    this.dataSource = new DataSource(config);
  }

  async connect(): Promise<void> {
    try {
      await this.dataSource.initialize();
      console.log('TypeORM connected successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.dataSource.destroy();
      console.log('TypeORM disconnected successfully.');
    } catch (error) {
      console.error('Unable to disconnect from the database:', error);
      throw error;
    }
  }

  getRepository<T>(entity: new () => T): Repository<T> {
    return this.dataSource.getRepository(entity);
  }

  // Add other methods as needed
}
