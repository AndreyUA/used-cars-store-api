import { DataSourceOptions } from 'typeorm';

const ormConfig = (): DataSourceOptions => {
  switch (process.env.NODE_ENV) {
    case 'dev':
    case 'test':
      return {
        type: 'sqlite',
        database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      };
    case 'prod':
      // TODO: add postgres here
      break;
    default:
      throw new Error('Unknown environment');
  }
};

export default ormConfig;
