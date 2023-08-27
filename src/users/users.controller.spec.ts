import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

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

  it('findOneUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOneUser = (id: number) => {
      throw new NotFoundException();
    };

    await expect(controller.findOneUser('1')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('findUsers returns a list of users with the given email', async () => {
    const users = await controller.findUsers(email);

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(email);
  });

  it('findOneUser returns single user with the given id', async () => {
    const user = await controller.findOneUser('1');

    expect(user).toBeDefined();
    expect(user.id).toEqual(1);
  });
});
