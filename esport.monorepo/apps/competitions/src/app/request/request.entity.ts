import { Request } from '@prisma/client';
import { setDate } from '../../utils/date/set-date';

import { CompetitionEntity } from '../competition/competition.entity';
import { CompetitorEntity } from '../competitor/competitor.entity';

export class RequestEntity implements Request {
  id: number;
  competitorId: number;
  competitionId: number;
  createdAt: Date;
  updatedAt: Date;
  isAccepted: boolean;

  competition?: CompetitionEntity;
  competitor?: CompetitorEntity;

  static createInstance(partial: Partial<RequestEntity>) {
    if (partial instanceof RequestEntity) return partial;
    return new RequestEntity(partial);
  }

  constructor(partial: Partial<RequestEntity>) {
    this.id = partial.id;
    this.competitorId = partial.competitorId;
    this.competitionId = partial.competitionId;
    this.createdAt = setDate(partial.createdAt);
    this.updatedAt = setDate(partial.updatedAt);
    this.isAccepted = partial.isAccepted;
    this.competition = CompetitionEntity.createInstance(partial.competition);
    this.competitor = CompetitorEntity.createInstance(partial.competitor);
  }
}
