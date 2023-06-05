import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  to: string;
}
