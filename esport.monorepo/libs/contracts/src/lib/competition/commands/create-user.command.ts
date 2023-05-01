import {
  ICategoryWithRounds,
  ICompetitionWithCategories,
  IUser,
} from '@esport.monorepo/interfaces';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export namespace UserCreate {
  export const topic = 'competitions.create-user.command';

  export class Request {
    @IsNumber()
    id: number;

    @IsString()
    name: string;
  }

  export class Response {
    user: IUser;
  }
}
