import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateQuoteRequest {
  @IsNotEmpty()
  @IsNumber()
  username: string;

  @IsNotEmpty()
  password: string;
}
