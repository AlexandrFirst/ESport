import { IsArray, IsOptional, IsString } from "class-validator";
import { IFight } from "../../interfaces";

export namespace CategoryCreate {
  export const topic = "competitions.category.create-category.command";

  export class Request {
    @IsString()
    title: string;

    @IsArray()
    @IsOptional()
    fights: Omit<IFight, "_id" | "winnerId">[];
  }

  export class Response {
    id: string;
  }
}