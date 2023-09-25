import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import ormConfig from './ormConfig';

// TODO: resolve it!
// ! https://docs.nestjs.com/techniques/cookies
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env-${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig()),
    UsersModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [
    // ! Global validation pipe
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    // ! Global cookies middleware
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get<string>('COOKIES_KEY')],
        }),
      )
      .forRoutes('*');
  }
}
