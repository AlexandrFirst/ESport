import { IsArray } from "class-validator";
import { ICompetition } from "../../interfaces";

export namespace CompetitionsAddCategory {
  export const topic = "competitions.add-category.command";

  export class Request {
    @IsArray()
    categories: ICompetition["categories"];
  }

  export class Response {
    message?: string;
  }
}
