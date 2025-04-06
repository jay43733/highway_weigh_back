import { Body, Controller, Post } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('login')
  public async login(@Body() loginDto: LoginDto) {
    return this.authsService.login(loginDto);
  }
}
