import {
  ICategoryWithRounds,
  ICompetitionWithCategories,
} from '@esport.monorepo/interfaces';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export namespace CompetitionCreateWithCategories {
  export const topic =
    'competitions.create-competition-with-categories.command';

  export class Request {
    @IsString()
    title: string;

    @IsNumber()
    organizationId: number;

    @IsArray()
    @IsOptional()
    categories: ICategoryWithRounds[];

    @IsString()
    dateStart: string;

    @IsString()
    @IsOptional()
    dateEnd?: string;
  }

  export class Response {
    competition: ICompetitionWithCategories;
  }
}
