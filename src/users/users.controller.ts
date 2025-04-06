import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public getUsers() {
    return this.usersService.getAllUser();
  }

  @Get('search')
  public findUserEmail(@Query('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Post()
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
