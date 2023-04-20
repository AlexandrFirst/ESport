import { IsString } from "class-validator";
import { ICompetition } from "../../interfaces";

export namespace CompetitionsGetById {
  export const topic = "competitions.competition.get-competition-by-id.query";

  export class Request {
    @IsString()
    _id: string;
  }
  import { Controller } from '@nestjs/common';
  import { RMQRoute, RMQValidate } from 'nestjs-rmq';
  
  import {
    CategoryCreate,
    CategoryUpdate,
    IFight,
  } from 'esport-lib-ts/lib/competitions';
  
  import { CategoryService } from './category.service';
  import { FightService } from '../fight/fight.service';
  
  @Controller()
  export class CategoryCommands {
    constructor(
      private readonly categoryService: CategoryService,
      private readonly fightService: FightService,
    ) {}
  
    @RMQValidate()
    @RMQRoute(CategoryCreate.topic)
    async createCategory(
      req: CategoryCreate.Request,
    ): Promise<CategoryCreate.Response> {
      const fights = await this.fightService.updateOrCreateMany(req.fights);
      const { _id } = await this.categoryService.create({ ...req, rounds: [] });
      return { id: _id };
    }
  
    @RMQValidate()
    @RMQRoute(CategoryUpdate.topic)
    async updateCategory({
      title,
      fights,
    }: CategoryUpdate.Request): Promise<CategoryUpdate.Response> {
      //TODO: fix this => only for compile
      const cat = await this.categoryService.findById(0 as any);
      if (!cat) {
        throw new Error('Category not found');
      }
      let newFights: IFight[] = [];
      if (fights) {
        newFights = await this.fightService.updateOrCreateMany(fights);
      }
      return this.categoryService.update({
        title,
        // fights: fights ? newFights : undefined,
      });
    }
  }
  
  export class Response {
    competition: ICompetition;
  }
}
