import { ICompetition } from 'esport-lib-ts/lib/competition';

export namespace CompetitionsGetAll {
  export const topic = 'competitions.competition.get-all-competitions.query';

  export class Response {
    competitions: ICompetition[];
  }
}
