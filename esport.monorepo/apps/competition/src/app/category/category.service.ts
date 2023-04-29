import { ICategory, ICategoryWithRounds } from '@esport.monorepo/interfaces';
import { Injectable } from '@nestjs/common';

import { CategoryEntity } from './category.entity';
import { CategoryEventEmitter } from './category.event-emitter';
import { CategoryRepository } from './category.repository';
import { ESportError } from '../error/error';
import { Err } from '../error/error.enum';
import { RoundService } from '../round/round.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly eventEmitter: CategoryEventEmitter,
    private readonly roundService: RoundService
  ) {}

  async findManyByIds(ids: string[], projection?: Record<string, unknown>) {
    return this.categoryRepository.find({ _id: { $in: ids } }, projection);
  }

  async findById(_id: string) {
    return this.categoryRepository.findById(_id);
  }

  async findByIdWithPopulate(_id: string) {
    return this.categoryRepository.findByIdWithPopulate(_id);
  }

  async create(c: ICategory) {
    const newCategory = new CategoryEntity(c);
    return this.categoryRepository.create(newCategory);
  }

  async createWithRounds(c: ICategoryWithRounds) {
    // const fights = c.rounds.map((r) => r.fights).flat();
    // console.log('===fights===', fights);
    // const fightIds: string[] = [];
    // for (const fight of fights) {
    //   const newFight = await this.roundService.createWithFights(fight);
    //   fightIds.push(newFight._id);
    // }
    // const data = await Promise.all([
    //   fights.map((f) => this.fightService.create(f)),
    // ]);
    // const tmp = await this.fightService.create(fights[0]);
    const roundIds: string[] = [];
    for (const round of c.rounds) {
      const newRound = await this.roundService.createWithFights(round);
      roundIds.push(newRound._id);
    }

    console.log('===rounds===', roundIds);

    // const rounds = await createRange(
    //   c.rounds,
    //   this.roundService.createWithFights
    // );
    // Logger.log('WE ARE HERE AFTER');
    // console.log('===rounds===', rounds);

    return this.categoryRepository.create(
      new CategoryEntity({
        ...c,
        rounds: roundIds,
      })
    );
  }

  async update({ _id, title }: Partial<ICategory>) {
    const cat = await this.categoryRepository.findById(_id);
    if (!cat) {
      throw new ESportError('Category not found', Err.BAD_REQUEST);
    }
    await this.updateCategory(
      //TODO: fix this => only for compile
      new CategoryEntity(cat as any).updateCategoryData({
        title,
        // fights,
        rounds: [],
      })
    );
    return { message: 'ok' };
  }

  private async updateCategory(cat: CategoryEntity) {
    return Promise.all([
      this.eventEmitter.handle(cat),
      this.categoryRepository.update(cat),
    ]);
  }
}
