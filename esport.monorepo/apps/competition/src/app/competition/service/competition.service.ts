import { Injectable } from '@nestjs/common';

import { CompetitionCreated } from '@esport.monorepo/contracts';
import {
  ICompetition,
  ICompetitionWithCategories,
} from '@esport.monorepo/interfaces';

import { CompetitionEntity } from '../competition.entity';
import { CompetitionEventEmitter } from '../controllers/competition.event-emitter';

import { CompetitionRepository } from '../competition.repository';
import { CategoryService } from '../../category/category.service';

@Injectable()
export class CompetitionService {
  constructor(
    private readonly competitionRepo: CompetitionRepository,
    private readonly eventEmitter: CompetitionEventEmitter,
    private readonly categoryService: CategoryService
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
    newCompetition.addEvent({
      topic: CompetitionCreated.topic,
      data: { id: comp.id },
    });
    await this.updateCompetition(newCompetition);
    return comp;
  }

  async createCompetitionWithCategories(c: ICompetitionWithCategories) {
    const categories: string[] = [];
    for (const cat of c.categories) {
      const category = await this.categoryService.createWithRounds(cat);
      categories.push(category._id);
    }
    console.log('===categories===', categories);
    const newCompetition = new CompetitionEntity({
      ...c,
      categories,
    });
    const newComp = await this.competitionRepo.create(newCompetition);
    const comp = await this.competitionRepo.findByIdWithPopulate(newComp._id);
    // newCompetition.addEvent({
    //   topic: CompetitionCreated.topic,
    //   data: { id: comp.id },
    // });
    // await this.updateCompetition(newCompetition);
    return comp;
  }

  private async updateCompetition(comp: CompetitionEntity) {
    return Promise.all([
      this.eventEmitter.handle(comp),
      this.competitionRepo.update(comp),
    ]);
  }
}
