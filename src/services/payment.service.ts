import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  getHealth(): string {
    return 'Server is up and running!';
  }
}
