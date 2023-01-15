import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export namespace FightCreate {
  export const topic = "competitions.fight.create-fight.command";

  export class Request {
    @IsBoolean()
    isProcessed: boolean;

    @IsString()
    @IsOptional()
    winnerId?: string;

    @IsNumber()
    accNumber: number;

    @IsArray()
    @IsOptional()
    competitorIds?: string[];
  }

  export class Response {
    id: string;
  }
}
