import { Injectable } from '@nestjs/common';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@Injectable()
export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly userName: string;

  @IsString()
  @IsOptional()
  readonly bio: string;
}
