import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentRequest {
  @IsNotEmpty()
  @IsNumber()
  username: string;

  @IsNotEmpty()
  password: string;
}
