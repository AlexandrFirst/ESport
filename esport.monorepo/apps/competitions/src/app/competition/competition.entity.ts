import { Competition } from '@prisma/client';

import { IDomainEvent } from '@esport.monorepo/contracts';

import { setDate } from '../../utils/date/set-date';
import { CategoryEntity } from '../category/category.entity';
import isBefore from 'date-fns/isBefore';

export class CompetitionEntity implements Competition {
  id: number;
  title: string;
  dateStart: Date;
  dateEnd: Date;
  organisationId: number;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
  registrationCloseDate: Date;
  address: string;

  categories?: CategoryEntity[];

  events: IDomainEvent[] = [];

  isRegistrationOpen: boolean;

  static createInstance(partial: Partial<CompetitionEntity>) {
    if (partial instanceof CompetitionEntity) return partial;
    return new CompetitionEntity(partial);
  }

  constructor(partial: Partial<CompetitionEntity>) {
    this.id = partial.id;
    this.title = partial.title;
    this.dateStart = setDate(partial.dateStart);
    this.dateEnd = setDate(partial.dateEnd);
    this.organisationId = partial.organisationId;
    this.categories = partial.categories.map((c) => new CategoryEntity(c));
    this.registrationCloseDate = setDate(partial.registrationCloseDate);
    this.createdBy = partial.createdBy;
    this.createdAt = setDate(partial.createdAt);
    this.updatedAt = setDate(partial.updatedAt);
    this.isRegistrationOpen = partial.isRegistrationOpen;
  }

  addEvent(event: IDomainEvent) {
    this.events.push(event);
    return this;
  }

  computeIsRegistrationOpen() {
    this.isRegistrationOpen = isBefore(new Date(), this.registrationCloseDate);
    return this;
  }
}
