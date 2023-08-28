import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
  Query,
  Delete,
  Session,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from '../decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User): User {
    return user;
  }

  @Post('/signup')
  async signup(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(
    @Body() body: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;

    return user;
  }

  @Post('signout')
  signout(@Session() session: any): void {
    session.userId = null;
  }

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
