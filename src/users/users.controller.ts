import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  Query,
  Delete,
  UseInterceptors,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(body.email, body.password);
  }

  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  async findOneUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOneUser(parseInt(id));
  }

  @Get()
  async findUsers(@Query('email') email: string): Promise<Array<User>> {
    return await this.usersService.findUsers(email);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string): Promise<User> {
    return await this.usersService.removeUser(parseInt(id));
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.updateUser(parseInt(id), body);
  }
}
