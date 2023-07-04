import { IsString } from 'class-validator';
import { ICompetitionWithCategories } from '@esport.monorepo/interfaces';

export namespace CompetitionGetPopulatedById {
  export const topic = 'competitions.get-populated-competition-by-id.query';

  export class Request {
    @IsString()
    _id: string;
  }

  export class Response {
    competition: ICompetitionWithCategories;
  }
}
