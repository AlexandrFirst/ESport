import type { Competition } from '@prisma/client';
import { IsNumber } from 'class-validator';

export namespace CompetitionsGetById {
  export const topic = 'competitions.by-id.query';

  export class Request {
    @IsNumber()
    competitionId: number;
  }

  export class Response {
    competitions: Competition[] = [];
  }
}
