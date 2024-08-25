import { Sequelize } from 'sequelize';

class DatabaseProvider {
  private sequelize: Sequelize;

  constructor(connectionString: string) {
    this.sequelize = new Sequelize(connectionString);
  }

  public async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection established.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  public getSequelizeInstance(): Sequelize {
    return this.sequelize;
  }
}

export default DatabaseProvider;
