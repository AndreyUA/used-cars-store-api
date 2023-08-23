import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
// TODO: resolve it!
// ! https://docs.nestjs.com/techniques/cookies
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['randomString'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api');

  await app.listen(8000);
}
bootstrap();
