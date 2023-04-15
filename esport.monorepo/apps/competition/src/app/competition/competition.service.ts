import { Injectable } from '@nestjs/common';
import { CompetitionEntity } from './competition.entity';
import { CompetitionEventEmitter } from './competition.event-emitter';

import { CompetitionRepository } from './competition.repository';

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

  // async createCompetition(c: ICompetition) {
  //   const newCompetition = new CompetitionEntity(c);
  //   const comp = await this.competitionRepo.create(newCompetition);
  //   const data = { id: comp.id };
  //   newCompetition.addEvent({
  //     topic: CompetitionCreated.topic,
  //     data,
  //   });
  //   await this.updateCompetition(newCompetition);
  //   return data;
  // }

  private async updateCompetition(comp: CompetitionEntity) {
    return Promise.all([
      this.eventEmitter.handle(comp),
      this.competitionRepo.update(comp),
    ]);
  }
}
