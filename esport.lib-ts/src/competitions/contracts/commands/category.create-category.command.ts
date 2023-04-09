import { IsArray, IsOptional, IsString } from "class-validator";
import { IRound } from "../../interfaces";

export namespace CategoryCreate {
  export const topic = "competitions.category.create-category.command";

  export class Request {
    @IsString()
    title: string;

    @IsArray()
    @IsOptional()
    rounds: Omit<IRound, "_id">[];
  }

  export class Response {
    id: string;
  }
}
