import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginUserResponse } from 'src/api-contracts/responses';
import { User } from 'src/entities/auth/user.entity';
import { AppService } from 'src/services/app.service';
import { STATUS } from 'src/types/status';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private appService: AppService) {
    super();
  }

  async validate(usernameOrEmail: string, password: string): Promise<Partial<User>> {
    const isEmail = usernameOrEmail.includes('@');

    const user = await this.appService.validateUser({
      email: isEmail ? usernameOrEmail : undefined,
      username: isEmail ? undefined : usernameOrEmail,
      password: password,
    });

    if (!user) {
      const errorResponse = new LoginUserResponse(
        null,
        'Invalid Credentials',
        STATUS.FAILED,
        'Error logging in user',
      );
      throw new UnauthorizedException(errorResponse);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...result } = user;

    return result;
  }
}
