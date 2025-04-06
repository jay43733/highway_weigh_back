import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'This is email for signing in',
  })
  @IsEmail({}, { message: 'Please input email format' })
  @MaxLength(96)
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '88888888',
    description:
      'This is password for signing in and must be at least 8 letters',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
