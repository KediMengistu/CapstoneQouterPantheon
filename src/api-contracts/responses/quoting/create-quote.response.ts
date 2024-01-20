import { EditUser } from 'src/types/edit-user';
import { CustomResponse } from '../response.response';

export class CreateQuoteResponse extends CustomResponse {
  constructor(
    public readonly data: EditUser,
    public readonly message: string,
    public readonly status: string,
    public readonly error?: string,
  ) {
    super(data, message, status, error);
  }
}
