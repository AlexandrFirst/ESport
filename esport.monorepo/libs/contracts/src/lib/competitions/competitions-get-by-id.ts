import type { Competition } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export namespace CompetitionsGetById {
  export const topic = 'competitions.by-id.query';

  export class Request {
    @IsNumber()
    competitionId: number;

    @IsBoolean()
    @IsOptional()
    includeRequests?: boolean;
  }

  export class Response {
    competition: Competition;
  }
}
