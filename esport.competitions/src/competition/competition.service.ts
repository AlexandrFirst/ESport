import { Injectable } from '@nestjs/common';
import { CompetitionRepository } from './competition.repository';
import { CompetitionEntity } from './competition.entity';
import { ICompetition } from 'esport-lib-ts/lib';
import { CompetitionEventEmitter } from './competition.event-emitter';
import { CompetitionCreated } from './TEMP/competition.competition-created.event';

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
    const comp = await this.competitionRepository.create(
      new CompetitionEntity(c),
    );
    const data = { id: comp._id };
    const newCompetition = new CompetitionEntity(comp).addEvent({
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
