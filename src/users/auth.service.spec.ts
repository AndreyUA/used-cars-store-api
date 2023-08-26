import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const scrypt = promisify(_scrypt);

const email = 'asdf@asdf.com';
const password = 'qqqwwweee';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: Array<User> = [];

    fakeUsersService = {
      findUsers: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);

        return Promise.resolve(filteredUsers);
      },
      createUser: (email: string, password: string) => {
        users.push({
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User);

        return Promise.resolve(users.at(-1));
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', () => {
    expect(service).toBeDefined();
  });

  it('creates new user with a salted and hashed password', async () => {
    const user = await service.signup(email, password);

    expect(password).not.toEqual(user.password);

    const [saltFromNewUser, hashFromNewUser] = user.password.split('.');
    expect(saltFromNewUser).toBeDefined();
    expect(hashFromNewUser).toBeDefined();

    const hash = (
      (await scrypt(password, saltFromNewUser, 32)) as Buffer
    ).toString('hex');

    expect(hash).toEqual(hashFromNewUser);
  });

  it('throws an error if user signs up with exists email', async () => {
    await service.signup(email, password);

    await expect(service.signup(email, password)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(service.signin(email, password)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws if an invalid password is provided', async () => {
    await service.signup(email, password);

    await expect(service.signin(email, `${password}1111`)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('returns a user if correct email and password provided', async () => {
    await service.signup(email, password);

    const user = await service.signin(email, password);

    expect(user).toBeDefined();
  });
});
