import { Injectable } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Injectable()
export class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
