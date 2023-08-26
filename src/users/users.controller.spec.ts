import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

const email = 'asdf@asdf.com';
const password = 'qqqwwweee';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOneUser: (id: number) => {
        return Promise.resolve({
          id,
          email,
          password,
        } as User);
      },
      findUsers: (email: string) => {
        return Promise.resolve([
          {
            id: 123123,
            email,
            password,
          } as User,
        ]);
      },
      removeUser: (id: number) =>
        Promise.resolve({
          id,
          email,
          password,
        } as User),
      updateUser: (id: number, attrs: Partial<User>) =>
        Promise.resolve({
          id,
          ...attrs,
        } as User),
    };

    fakeAuthService = {
      signup: (email: string, password: string) =>
        Promise.resolve({
          id: 123,
          email,
          password,
        } as User),
      signin: (email: string, password: string) =>
        Promise.resolve({
          id: 123,
          email,
          password,
        } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
