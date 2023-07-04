import { Injectable } from '@nestjs/common';

import { OrganisationService } from '../organisation/organisation.service';

import { CompetitionRepository } from './competition.repository';
import { CompetitionEntity } from './competition.entity';
import { CompetitionEventEmitter } from './competition.event-emitter';

@Injectable()
export class CompetitionService {
  constructor(
    private readonly repo: CompetitionRepository,
    private readonly eventEmitter: CompetitionEventEmitter
  ) {}

  async findAll() {
    return this.repo.findAll();
  }

  async findByOrganisationId(organisationId: number) {
    return this.repo.findByOrganisationId(organisationId);
  }

  async create(data: CompetitionEntity) {
    const newCompetition = new CompetitionEntity(data);
    const comp = await this.repo.create(newCompetition);
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
      this.repo.update(comp),
    ]);
  }
}
