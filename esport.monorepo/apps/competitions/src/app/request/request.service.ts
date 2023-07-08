import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class RequestService {
  constructor(private readonly primaryService: PrismaService) {}

  async createRequestWithExistingCompetitor(data: {
    competitorId: number;
    competitionId: number;
  }) {
    return this.primaryService.request.create({
      data: {
        competitor: {
          connect: { id: data.competitorId },
        },
        competition: {
          connect: { id: data.competitionId },
        },
      },
    });
  }

  async findRequestByCompetitorAndCompetitionId(data: {
    competitorId: number;
    competitionId: number;
  }) {
    return this.primaryService.request.findFirst({
      where: {
        competitorId: data.competitorId,
        competitionId: data.competitionId,
      },
    });
  }
}
