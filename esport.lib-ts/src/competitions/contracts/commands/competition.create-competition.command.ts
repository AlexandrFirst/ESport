import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export namespace CompetitionCreate {
  export const topic = "competitions.competition.create-competition.command";

  export class Request {
    @IsString()
    title: string;

    @IsNumber()
    organizationId: number;

    @IsArray({ each: true })
    @IsOptional()
    categories?: string[];

    @IsString()
    dateStart: string;

    @IsString()
    @IsOptional()
    dateEnd?: string;
  }

  export class Response {
    id: string;
  }
}
