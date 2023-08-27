import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const email = 'asdf@asdf.com';
const password = 'qqqwwweee';

describe('Auth system', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.setGlobalPrefix('api');

    await app.init();
  });

  it('handles a signup request', () => {
    return request(app.getHttpServer())
      .post('/api/auth/signup')
      .send({
        email,
        password,
      })
      .expect(201)
      .then((response) => {
        const { id: userId, email: userEmail } = response.body;
        expect(userId).toBeDefined();
        expect(userEmail).toEqual(email);
      });
  });
});
