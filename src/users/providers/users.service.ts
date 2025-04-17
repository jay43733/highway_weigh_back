import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async getAllUser() {
    console.log('SECRET_KEY:', process.env.SECRET_KEY);
    return await this.usersRepository.find();
  }

  public async createUser(@Body() createUserDto: CreateUserDto) {
    const checkEmailExisted = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (checkEmailExisted) {
      return 'Email is already used.';
    }

    let newUser = this.usersRepository.create(createUserDto);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    newUser.password = hashedPassword;
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  public async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }
  public async findUserById(id: number) {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }
}
