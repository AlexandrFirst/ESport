import { Injectable } from '@nestjs/common';

import { CompetitionEntity } from './competition.entity';
import { CompetitionEventEmitter } from './competition.event-emitter';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CompetitionService {
  constructor(
    // private readonly repo: CompetitionRepository,
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: CompetitionEventEmitter
  ) {}

  async findByOrganisationId(organisationId: number) {
    return this.prismaService.competition.findMany({
      where: { organisationId },
    });
  }

  async findById(id: number) {
    return this.prismaService.competition.findUnique({ where: { id } });
  }

  async create(data: CompetitionEntity) {
    const newCompetition = new CompetitionEntity(data);
    const { categories, ...competition } = newCompetition;
    const comp = await this.prismaService.competition.create({
      data: competition,
    });
    newCompetition.addEvent({
      topic: 'competitions.competition-created.event',
      data: {
        id: comp.id,
        name: comp.title,
        organisationId: comp.organisationId,
      },
    });
    await this.updateCompetition(newCompetition);
    return comp;
  }

  private async updateCompetition(comp: CompetitionEntity) {
    return Promise.all([
      this.eventEmitter.handle(comp),
      // this.repo.update(comp),
    ]);
  }
}
