import { Injectable } from '@nestjs/common';

import { CompetitionCreated } from '@esport.monorepo/contracts';
import { ICompetition } from '@esport.monorepo/interfaces';

import { CompetitionEntity } from '../competition.entity';
import { CompetitionEventEmitter } from '../controllers/competition.event-emitter';

import { CompetitionRepository } from '../competition.repository';

@Injectable()
export class CompetitionService {
  constructor(
    private readonly competitionRepo: CompetitionRepository,
    private readonly eventEmitter: CompetitionEventEmitter
  ) {}

  async getAll() {
    return this.competitionRepo.findWithPopulate({});
  }

  async findByIdWithPopulate(id: string) {
    return this.competitionRepo.findByIdWithPopulate(id);
  }

  async createCompetition(c: ICompetition) {
    const newCompetition = new CompetitionEntity(c);
    const comp = await this.competitionRepo.create(newCompetition);
    const data = { id: comp.id };
    newCompetition.addEvent({
      topic: CompetitionCreated.topic,
      data,
    });
    await this.updateCompetition(newCompetition);
    return data;
  }

  private async updateCompetition(comp: CompetitionEntity) {
    return Promise.all([
      this.eventEmitter.handle(comp),
      this.competitionRepo.update(comp),
    ]);
  }
}
