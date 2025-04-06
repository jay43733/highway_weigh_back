import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Jay Tanakit',
    description: "This is an user's name",
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'This is email for signing in',
  })
  @IsEmail({}, { message: 'Please input email format' })
  @MaxLength(96)
  @IsNotEmpty()
  // @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
  //   message: 'Please input email format.',
  // })
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

  @ApiPropertyOptional({
    example: '0812345678',
    description: 'Phone number',
  })
  @IsString()
  @IsOptional()
  @Length(10)
  phone_number?: string;

  @ApiProperty({
    example: '1',
    description:
      '1: Director, 2: Head Stations, 3: Station staff, 4: Inspector, 5: Admin',
  })
  @IsEnum(Role, {
    message:
      'Role must be either director, head of stations, station staff, inspector or admin" ',
  })
  @IsNotEmpty()
  role: Role;
}
