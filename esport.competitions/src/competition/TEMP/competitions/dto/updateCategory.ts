import { ICompetition } from 'esport-lib-ts/lib/competition';

export class UpdateCategoryRequest {
  id: string;
  categories: ICompetition['categories'];
}
