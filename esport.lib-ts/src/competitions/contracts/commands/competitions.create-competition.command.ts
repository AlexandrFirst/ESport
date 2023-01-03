import { ICompetition } from "../../interfaces";
import { IsNumber, IsOptional, IsString } from "class-validator";

export namespace CompetitionsCreateCompetition {
  export const topic = "competitions.create-competition.command";

  export class Request {
    @IsString()
    title: string;

    @IsString()
    dateStartStr: string; //must be in date format

    @IsOptional()
    @IsString()
    dateEndStr?: string; //must be in date format

    @IsNumber()
    organizationId: number;

    @IsOptional()
    categories?: ICompetition["categories"];
  }

  export class Response {
    _id: string;
  }
}
