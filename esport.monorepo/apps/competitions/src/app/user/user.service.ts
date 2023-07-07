import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}

  async findUserById(
    id: number,
    params?: { includeCompetitors?: boolean; includeRequests?: boolean }
  ) {
    const { includeCompetitors = false, includeRequests = false } =
      params || {};

    const a = await this.repo.findUserById(id, {
      include: {
        competitors: includeCompetitors && {
          orderBy: { createdAt: 'desc' },
          include: {
            requests: includeRequests,
          },
        },
      },
    });

    return a;
  }

  async create(data: UserEntity) {
    return this.repo.create(data);
  }
}
