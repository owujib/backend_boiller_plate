import { Sequelize } from 'sequelize-typescript';
import { IDatabaseProvider } from '../interface/IDataProvider';

export class SequelizeProvider implements IDatabaseProvider {
  private sequelize: Sequelize;

  constructor(config: any) {
    this.sequelize = new Sequelize(config);
  }

  async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Sequelize connected successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.sequelize.close();
      console.log('Sequelize disconnected successfully.');
    } catch (error) {
      console.error('Unable to disconnect from the database:', error);
      throw error;
    }
  }

  getRepository<T>(entity: new () => T): any {
    return this.sequelize.getRepository(entity);
  }

  // Add other methods as needed
}
