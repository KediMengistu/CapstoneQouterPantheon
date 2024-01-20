import { Body, Controller, Get, Post, Res, Request, UseGuards, Patch, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../services/app.service';
import { EditProfileRequest, LoginUserRequest, RegisterUserRequest } from 'src/api-contracts/requests/auth';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Get('/health')
  getHealth2(): string {
    return this.appService.getHealth();
  }

  @Post('/register')
  async registerUser(@Body() registerUserRequest: RegisterUserRequest, @Res() response: Response) {
    const data = await this.appService.registerUser(registerUserRequest);

    if (data?.error || !data) {
      return response.status(HttpStatus.BAD_REQUEST).json(data);
    }
    return response.status(HttpStatus.CREATED).json(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() response: Response) {
    const data = await this.appService.loginUser(req.user);

    return response.status(HttpStatus.OK).json(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(@Request() req, @Res() response: Response) {
    const data = await this.appService.logoutUser(req.user);

    return response.status(HttpStatus.OK).json(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/edit-profile')
  async editProfile(@Body() editProfileRequest: EditProfileRequest, @Request() req, @Res() response: Response) {
    const userId = req.user.id;

    const data = await this.appService.editProfile(userId, editProfileRequest);

    if (data?.error || !data) {
      return response.status(HttpStatus.BAD_REQUEST).json(data);
    }

    return response.status(HttpStatus.CREATED).json(data);
  }
}
