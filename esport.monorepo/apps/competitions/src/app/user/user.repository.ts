import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(id: number, { include }: { include: Prisma.UserInclude }) {
    return this.prismaService.user.findUnique({
      where: { id },
      include,
    });
  }

  async create(user: UserEntity) {
    const { competitors, ...data } = user;
    return this.prismaService.user.create({ data });
  }
}
