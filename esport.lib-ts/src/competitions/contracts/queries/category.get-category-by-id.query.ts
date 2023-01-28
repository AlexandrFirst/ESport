import { IsString } from "class-validator";
import { ICategory } from "../../interfaces";

export namespace CategoriesGetById {
  export const topic = "competitions.category.get-category-by-id.query";

  export class Request {
    @IsString()
    _id: string;
  }

  export class Response {
    category: ICategory;
  }
}
