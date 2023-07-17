import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.create({ email, password });
    await this.usersRepository.save(user);

    return user;
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    return user;
  }

  async findUsers(email: string): Promise<Array<User>> {
    const users = await this.usersRepository.find({
      where: { email },
    });

    return users;
  }

  updateUser(id: number, attrs: Partial<User>): Promise<User> {
    return null;
  }

  removeUser(id: number): Promise<void> {
    return null;
  }
}
