import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/providers/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthsService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  public async validateUser(email: string, password: string) {
    const checkUser = await this.usersService.findUserByEmail(email);
    if (!checkUser) {
      throw new UnauthorizedException('Invalid email');
    }

    console.log(`User ${checkUser.password}`);
    const isMatchPassword = await bcrypt.compare(password, checkUser.password);
    console.log(`Yeahhh ${isMatchPassword}`);
    if (!isMatchPassword) {
      throw new UnauthorizedException("Password isn't matched");
    }

    const { password: string, ...result } = checkUser;
    console.log(`Yeahhh ${result}`);
    return result;
  }

  public async login(loginDto: LoginDto) {
    console.log('SECRET_KEY:', process.env.SECRET_KEY);
    console.log('Login.....');
    const user = await this.validateUser(loginDto.email, loginDto.password);
    console.log('payload.....');
    const payload = { name: user.name, id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    console.log('Token.....');
    const response = { token: token, payload: payload };
    return {
      response,
    };
  }
}
