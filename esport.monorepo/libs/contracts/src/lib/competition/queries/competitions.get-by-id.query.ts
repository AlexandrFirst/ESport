import { ICompetition } from '@esport.monorepo/interfaces';
import { IsString } from 'class-validator';

export namespace CompetitionsGetById {
  export const topic = 'competitions.get-competition-by-id.query';

  export class Request {
    @IsString()
    _id: string;
  }

  export class Response {
    competition: ICompetition;
  }
}
