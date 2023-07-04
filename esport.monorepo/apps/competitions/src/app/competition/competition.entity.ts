import { Competition } from '@prisma/client';

import { IDomainEvent } from '@esport.monorepo/contracts';

import { setDate } from '../../utils/date/set-date';
import { CategoryEntity } from '../category/category.entity';

export class CompetitionEntity implements Competition {
  id: number;
  title: string;
  dateStart: Date;
  dateEnd: Date;
  organisationId: number;
  isRegistrationOpen: boolean;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;

  categories?: CategoryEntity[];

  events: IDomainEvent[] = [];

  constructor(partial: Partial<CompetitionEntity>) {
    this.id = partial.id;
    this.title = partial.title;
    this.dateStart = setDate(partial.dateStart);
    this.dateEnd = setDate(partial.dateEnd);
    this.organisationId = partial.organisationId;
    this.categories = partial.categories.map((c) => new CategoryEntity(c));
  }

  addEvent(event: IDomainEvent) {
    this.events.push(event);
    return this;
  }
}
