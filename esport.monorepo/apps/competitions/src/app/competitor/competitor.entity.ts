import { Competitor } from '@prisma/client';
import { RequestEntity } from '../request/request.entity';

export class CompetitorEntity implements Competitor {
  id: number;
  name: string;
  userId: number;
  fightId: number;
  competitorType: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  height: number;
  weight: number;

  requests?: RequestEntity[];

  static createInstance(partial: Partial<CompetitorEntity>) {
    if (partial instanceof CompetitorEntity) return partial;
    return new CompetitorEntity(partial);
  }

  constructor(partial: Partial<CompetitorEntity>) {
    this.id = partial.id;
    this.name = partial.name;
    this.userId = partial.userId;
    this.fightId = partial.fightId;
    this.competitorType = partial.competitorType;
    this.level = partial.level;
    this.createdAt = partial.createdAt;
    this.updatedAt = partial.updatedAt;
    this.requests = partial.requests.map(RequestEntity.createInstance);
    this.height = partial.height;
    this.weight = partial.weight;
  }

  checkIfRequestExistsForCompetition(competitionId: number) {
    console.log('===this.requests===', this.requests);
    if (!this.requests) {
      throw new Error('No requests in competitor with id: ' + this.id);
    }
    return this.requests.some((r) => r.competitionId === competitionId);
  }
}
