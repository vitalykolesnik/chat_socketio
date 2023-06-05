import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMessageDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  text: string;
}
