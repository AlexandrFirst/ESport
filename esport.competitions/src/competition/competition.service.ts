import { Injectable } from '@nestjs/common';
import { CompetitionCreated, ICompetition } from 'esport-lib-ts/lib';

import { CompetitionRepository } from './competition.repository';
import { CompetitionEntity } from './competition.entity';
import { CompetitionEventEmitter } from './competition.event-emitter';

@Injectable()
export class CompetitionService {
  constructor(
    private readonly competitionRepository: CompetitionRepository,
    private readonly eventEmitter: CompetitionEventEmitter,
  ) {}

  async getAll() {
    return this.competitionRepository.findWithPopulate({});
  }

  async createCompetition(c: ICompetition) {
    const newCompetition = new CompetitionEntity(c);
    const comp = await this.competitionRepository.create(newCompetition);
    const data = { id: comp._id };
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
      this.competitionRepository.update(comp),
    ]);
  }
}
