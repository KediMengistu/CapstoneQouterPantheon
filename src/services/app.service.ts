import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EditProfileRequest, LoginUserRequest, RegisterUserRequest } from 'src/api-contracts/requests';
import { EditUserResponse, RegisterUserResponse } from 'src/api-contracts/responses';
import { LoginUserResponse } from 'src/api-contracts/responses';
import { LogoutUserResponse } from 'src/api-contracts/responses/auth/logout-response';
import { User } from 'src/entities/auth/user.entity';
import { UserRepository } from 'src/repositories/auth/user-repo/user.repository';
import { ROLES } from 'src/types/roles';
import { STATUS } from 'src/types/status';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  getHealth(): string {
    return 'Server is up and running!';
  }

  async registerUser(registerUserRequest: RegisterUserRequest): Promise<RegisterUserResponse> {
    const user = new User(
      registerUserRequest.first_name,
      registerUserRequest.last_name,
      registerUserRequest.username,
      registerUserRequest.password,
      registerUserRequest.email,
      registerUserRequest.isAdmin ? ROLES.SELLER : ROLES.BUYER,
      new Date().getTime(),
    );

    const usernameExists = await this.userRepository.getUserByUsername(user.username);

    const emailExists = await this.userRepository.getUserByEmail(user.email);

    if (usernameExists) {
      return new RegisterUserResponse(
        null,
        `User with username '${user.username}' already exists`,
        STATUS.FAILED,
        'Error registering user',
      );
    }

    if (emailExists) {
      return new RegisterUserResponse(
        null,
        `User with email '${user.email}' already exists`,
        STATUS.FAILED,
        'Error registering user',
      );
    }

    this.userRepository.createUser(user);

    return new RegisterUserResponse(user, 'User created', STATUS.SUCCESS);
  }

  async validateUser(loginUserRequest: LoginUserRequest): Promise<User> {
    const { username, email, password } = loginUserRequest;

    const user: User = email
      ? await this.userRepository.getUserByEmail(email)
      : await this.userRepository.getUserByUsername(username);

    // const isValidUser = user && await bcrypt.compare(password, user.password);
    const isValidUser = user && password === user.password;

    if (isValidUser) {
      return user;
    }

    return null;
  }

  async loginUser(user: User): Promise<any> {
    const payload = { username: user.username, email: user.email, id: user.id };

    const accessToken = { access_token: this.jwtService.sign(payload) };

    const response = new LoginUserResponse(user, 'User validated', STATUS.SUCCESS);

    return { ...response, ...accessToken };
  }

  async logoutUser(user: User): Promise<any> {
    const payload = { username: user.username, email: user.email, id: user.id };

    const accessToken = { access_token: this.jwtService.sign(payload, { expiresIn: '0.1s' }) };

    const response = new LogoutUserResponse(user, 'User validated', STATUS.SUCCESS);

    return { ...response, ...accessToken };
  }

  async editProfile(userId: number, editProfileRequest: EditProfileRequest): Promise<EditUserResponse> {
    return null;
  }
}
