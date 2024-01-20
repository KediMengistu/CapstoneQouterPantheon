import { IsNotEmpty, IsEmail, IsString, ValidateIf } from 'class-validator';

export class LoginUserRequest {
  @ValidateIf((o) => !o.email)
  @IsNotEmpty()
  @IsString()
  username?: string;

  @ValidateIf((o) => !o.username)
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  password: string;
}
