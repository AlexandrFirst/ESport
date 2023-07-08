import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Competitor, Prisma } from '@prisma/client';
import { CompetitorType } from '@esport.monorepo/contracts';

@Injectable()
export class CompetitorService {
  constructor(private readonly primaryService: PrismaService) {}

  async createCompetitorByUser(competitor: {
    competitorType: CompetitorType;
    level: number;
    weight?: number;
    height?: number;
    name: string;
    userId: number;
  }) {
    const { userId, ...data } = competitor;
    return this.primaryService.competitor.create({
      data: {
        ...data,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findCompetitorById(id: number) {
    return this.primaryService.competitor.findUnique({
      where: { id },
    });
  }
}
