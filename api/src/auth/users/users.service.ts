import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from '@api/auth/models';
import { Logger } from '@api/common';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async createUser(userSkeleton: Partial<User>) {
    const user = this.repository.create(userSkeleton);
    return await this.repository.insert(user).then(() => {
      this.logger.info(`User created: ${user.email}`);
      return user;
    });
  }

  getUser({ id, email }: Partial<User>) {
    return this.repository.findOne({ where: { id, email } });
  }
}
