import { DataSourceOptions, DataSource } from 'typeorm';

export const ormConfig = (): DataSourceOptions => {
  switch (process.env.NODE_ENV) {
    case 'dev':
    case 'test':
      return {
        type: 'sqlite',
        database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        migrationsRun: true,
      };
    case 'prod':
      // TODO: add postgres here
      break;
    default:
      throw new Error('Unknown environment');
  }
};

const dataSource = new DataSource(ormConfig());

export default dataSource;
