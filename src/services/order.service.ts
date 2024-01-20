import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderManagementService {
  getHealth(): string {
    return 'Server is up and running!';
  }
}
