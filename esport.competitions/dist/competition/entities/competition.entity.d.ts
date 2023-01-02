import { ICompetition } from '../../../../esport.contracts-ts/src/interfaces/competition/competition.interface';
import { ICategory } from '../../../../esport.contracts-ts/src/interfaces/competition/category.interface';
export declare class CompetitionEntity implements ICompetition {
    _id?: string;
    categories: ICategory[];
    dateStart: Date;
    dateEnd?: Date;
    organizationId: number;
    title: string;
    constructor(c: ICompetition);
}
