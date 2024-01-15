import { Injectable, Logger } from '@nestjs/common';

import { CompetitionEventEmitter } from './competition.event-emitter';

import { PrismaService } from '../database/prisma.service';
import { Competition } from '@prisma/client';

@Injectable()
export class CompetitionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: CompetitionEventEmitter
  ) {}

  async findByOrganisationId(organisationId: number) {
    return this.prismaService.competition.findMany({
      where: { organisationId },
    });
  }

  async findById(id: number, params?: { includeRequests?: boolean }) {
    const { includeRequests = false } = params || {};

    return this.prismaService.competition.findUnique({
      where: { id },
      include: {
        organisation: true,
        requests: includeRequests && {
          include: { competitor: true },
        },
      },
    });
  }

  async create(data: Competition) {
    Logger.debug(data);
    // const comp = await this.prismaService.competition.create({ data });

    // newCompetition.addEvent({
    //   topic: 'competitions.competition-created.event',
    //   data: {
    //     id: comp.id,
    //     name: comp.title,
    //     organisationId: comp.organisationId,
    //   },
    // });
    // await this.updateCompetition(newCompetition);

    // return comp;
    return 'Nice';
  }

  // private async updateCompetition(comp: CompetitionEntity) {
  //   return Promise.all([
  //     this.eventEmitter.handle(comp),
  //     // this.repo.update(comp),
  //   ]);
  // }
}
