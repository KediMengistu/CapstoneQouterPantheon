import { Controller, Get, HttpStatus, Post, Res, Request, UseGuards, Param, Body } from '@nestjs/common';
import { OrderManagementService } from '../services/order.service';
import { Response } from 'express';
import { PaymentService } from 'src/services/payment.service';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @Get('/retrieve-session/:bidSessionId')
  // async retrieveSession(@Param('bidSessionId') bidSessionId: string, @Res() response: Response) {
  //   const data = await this.paymentService.;

  //   if (data?.error || !data) {
  //     return response.status(HttpStatus.BAD_REQUEST).json(data);
  //   }

  //   return response.status(HttpStatus.CREATED).json(data);
  // }
}
