import { ICategory, ICompetition } from '@esport.monorepo/interfaces';
import { IsString } from 'class-validator';

export namespace CategoriesGetById {
  export const topic = 'categories.get-category-by-id.query';

  export class Request {
    @IsString()
    _id: string;
  }

  export class Response {
    category: ICategory;
  }
}
