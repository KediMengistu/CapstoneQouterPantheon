import { Injectable } from '@nestjs/common';

@Injectable()
export class QuotingService {
  getHealth(): string {
    return 'Server is up and running!';
  }
}
