import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

const email = 'asdf@asdf.com';
const password = 'qqqwwweee';
const user = {
  id: 123,
  email,
  password,
} as User;

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOneUser: (id: number) => Promise.resolve(user),
      findUsers: (email: string) => Promise.resolve([user]),
      removeUser: (id: number) => Promise.resolve(user),
      updateUser: (id: number, attrs: Partial<User>) => Promise.resolve(user),
    };

    fakeAuthService = {
      signup: (email: string, password: string) => Promise.resolve(user),
      signin: (email: string, password: string) => Promise.resolve(user),
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
