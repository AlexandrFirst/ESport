import { ICategory, ICompetition, IRound } from '@esport.monorepo/interfaces';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export namespace CategoryCreate {
  export const topic = 'competitions.create-category.command';

  export class Request {
    @IsString()
    title: string;

    @IsArray()
    rounds: IRound[];
  }

  export class Response {
    category: ICategory;
  }
}
