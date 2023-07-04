import { ICategory } from '@esport.monorepo/interfaces';

export namespace CategoriesGetAll {
  export const topic = 'categories.get-all-categories.query';

  export class Response {
    competitions: ICategory[];
  }
}
