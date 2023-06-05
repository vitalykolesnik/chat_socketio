import { Injectable } from '@nestjs/common';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@Injectable()
export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3)
  readonly userName: string;

  @IsString()
  @IsOptional()
  readonly bio: string;

  @IsString()
  @IsOptional()
  readonly socketId: string;

  @IsBoolean()
  @IsOptional()
  readonly isOnline: boolean;
}
