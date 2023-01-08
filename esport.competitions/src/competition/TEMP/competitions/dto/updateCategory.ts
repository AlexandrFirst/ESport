import { ICompetition } from 'esport-lib-ts/lib';

export class UpdateCategoryRequest {
  id: string;
  categories: ICompetition['categories'];
}
