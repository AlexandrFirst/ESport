import { Category, Round } from '@prisma/client';
import { CompetitionEntity } from '../competition/competition.entity';
import { setDate } from '../../utils/date/set-date';

export class CategoryEntity implements Category {
  id: number;
  title: string;
  competitionId: number;
  competition: CompetitionEntity;
  createdAt: Date;
  updatedAt: Date;

  rounds?: Round[];

  constructor(data: Partial<CategoryEntity>) {
    this.id = data.id;
    this.title = data.title;
    this.competitionId = data.competitionId;
    this.competition = data.competition;
    //TODO: make round entity
    this.rounds = data.rounds;
    this.createdAt = setDate(data.createdAt);
    this.updatedAt = setDate(data.updatedAt);
  }
}
