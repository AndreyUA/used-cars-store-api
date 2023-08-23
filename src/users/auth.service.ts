import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string): Promise<void> {
    const users = await this.userService.findUsers(email);
    if (users.length) {
      throw new BadRequestException();
    }

    return null;
  }

  signIn(): void {
    return null;
  }
}
