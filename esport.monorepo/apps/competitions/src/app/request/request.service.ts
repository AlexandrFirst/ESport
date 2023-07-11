import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { BadRequestError } from '@esport.monorepo/contracts';

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

  async deleteRequestById(id: number) {
    const request = await this.primaryService.request.findUnique({
      where: { id },
    });
    if (!request) {
      throw new BadRequestError(`Request with id: ${id} not found`);
    }
    return this.primaryService.request.delete({ where: { id } });
  }
}
