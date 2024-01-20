import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderRequest {
  @IsNotEmpty()
  @IsNumber()
  username: string;

  @IsNotEmpty()
  password: string;
}
