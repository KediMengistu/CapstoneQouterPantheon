import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../../../entities/auth/user.entity';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository extends Repository<User> implements IUserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: User): Promise<User> {
    this.dataSource.manager.create(User, user);
    return this.save(user);
  }

  async getUserById(id: number) {
    const user = await this.dataSource.manager.query(`SELECT * FROM users WHERE id = $1`, [id]);
    return user[0];
  }

  async getUsers(): Promise<User[]> {
    const users = await this.dataSource.manager.query(`SELECT * FROM users`);
    return users;
  }

  async updateUser(user: User): Promise<User> {
    const updatedUser = await this.dataSource.manager.query(
      `UPDATE users SET
      first_name = $1,
      last_name = $2,
      username = $3,
      password = $4,
      email = $5,
      role = $6,
      created_at = $7,
      updated_at = $8
      WHERE id = $9
      RETURNING *`,
      [
        user.first_name,
        user.last_name,
        user.username,
        user.password,
        user.email,
        user.role,
        user.created_at,
        user.updated_at,
        user.id,
      ],
    );

    return updatedUser[0];
  }

  async deleteUser(id: number): Promise<void> {
    this.delete(id);
  }
  async getUserByUsername(username: string): Promise<User> {
    const user = await this.dataSource.manager.query(`SELECT * FROM users WHERE username = $1`, [username]);
    return user[0];
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.dataSource.manager.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return user[0];
  }

  async getUsersByIds(userIds: number[]): Promise<User[]> {
    if (userIds.length === 0) return [];
    const placeholders = userIds.map((_, index) => `$${index + 1}`).join(', ');
    const users = await this.dataSource.manager.query(
      `SELECT * FROM users WHERE id IN (${placeholders})`,
      userIds,
    );
    return users;
  }
}
