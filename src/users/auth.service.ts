import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string): Promise<User> {
    const users = await this.userService.findUsers(email);

    if (users.length) {
      throw new BadRequestException();
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${salt}.${hash.toString('hex')}`;

    const user = await this.userService.createUser(email, result);

    return user;
  }

  signIn(): void {
    return null;
  }
}
