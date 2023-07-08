import { IsEnum, IsNumber, IsOptional } from 'class-validator';

import { CompetitorType } from '../constants';

export namespace CreateRequestByExistingUserCommand {
  export const topic = 'competitions.request-create-by-existing-user.command';

  export class Request {
    @IsNumber()
    competitionId: number;

    @IsNumber()
    userId: number;

    @IsEnum(CompetitorType)
    competitorType: CompetitorType;

    @IsNumber()
    @IsOptional()
    weight?: number;

    @IsNumber()
    @IsOptional()
    height?: number;

    @IsNumber()
    level: number;
  }

  export class Response {}
}
