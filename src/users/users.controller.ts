import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  Query,
  Delete,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(body.email, body.password);
  }

  @Get('/:id')
  async findOneUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOneUser(parseInt(id));
  }

  // TODO: validate empty query
  @Get()
  async findUsers(@Query('email') email: string): Promise<Array<User>> {
    return await this.usersService.findUsers(email);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.removeUser(parseInt(id));
  }
}
