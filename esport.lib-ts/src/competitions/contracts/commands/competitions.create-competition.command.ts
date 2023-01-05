import { ICompetition } from "../../interfaces";
import { IsNumber, IsOptional, IsString } from "class-validator";

export namespace CompetitionsCreateCompetition {
  export const topic = "competitions.create-competition.command";

  export class Request {
    @IsString()
    title: string;

    @IsNumber()
    organizationId: number;

    @IsOptional()
    categories?: ICompetition["categories"];

    dateStart: Date | string;

    @IsOptional()
    dateEnd?: Date | string;
  }

  export class Response {
    _id: string;
  }
}
