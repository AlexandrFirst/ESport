import { Injectable } from '@nestjs/common';
import { CompetitionRepository } from './competition.repository';
import { CompetitionEntity } from './competition.entity';
import { ICompetition } from 'esport-lib-ts/lib';
import { UpdateCategoryRequest } from './TEMP/competitions/dto/updateCategory';
import { CompetitionEventEmitter } from './competition.event-emitter';

@Injectable()
export class CompetitionService {
  constructor(
    private readonly competitionRepository: CompetitionRepository,
    private readonly eventEmitter: CompetitionEventEmitter,
  ) {}

  async createCompetition(comp: ICompetition) {
    return this.competitionRepository.create(new CompetitionEntity(comp));
  }

  async updateCategory({ id, categories }: UpdateCategoryRequest) {
    const comp = await this.competitionRepository.findOne({ _id: id });
    if (!comp) {
      throw new Error('Competition not found');
    }
    return new CompetitionEntity(comp).setCategoties(categories);
  }

  private async updateCompetition(comp: CompetitionEntity) {
    return Promise.all([
      this.eventEmitter.handle(comp),
      this.competitionRepository.update(comp),
    ]);
  }
}
