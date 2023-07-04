import type { Competition } from '@prisma/client';

export namespace CompetitionsGetAll {
  export const topic = 'competitions.all.query';

  export class Request {
  }

  export class Response {
    competitions: Competition[] = [];
  }
}