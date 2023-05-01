import { ICompetition } from '@esport.monorepo/interfaces';

export namespace CompetitionsGetAll {
  export const topic = 'competitions.get-all-competitions.query';

  export class Response {
    competitions: ICompetition[];
  }
}
