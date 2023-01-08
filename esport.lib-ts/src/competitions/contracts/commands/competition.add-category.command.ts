import { IsArray } from "class-validator";
import { ICompetition } from "../../interfaces";

export namespace CompetitionAddCategory {
  export const topic = "competitions.competition.add-category.command";

  export class Request {
    @IsArray()
    categories: ICompetition["categories"];
  }

  export class Response {
    message?: string;
  }
}
