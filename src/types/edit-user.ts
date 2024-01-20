export class EditUser {
  first_name: string;

  last_name: string;

  username: string;

  email: string;

  updated_at: number;

  constructor(
    first_name: string,
    last_name: string,
    username: string,
    email: string,

    updated_at: number,
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.username = username;
    this.email = email;
    this.updated_at = updated_at;
  }
}
