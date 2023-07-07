import { User } from '@prisma/client';
import { setDate } from '../../utils/date/set-date';

import { CompetitorEntity } from '../competitor/competitor.entity';

export class UserEntity implements User {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  competitors?: CompetitorEntity[];

  static createInstance(partial: Partial<UserEntity>) {
    if (partial instanceof UserEntity) return partial;
    return new UserEntity(partial);
  }

  constructor(partial: Partial<UserEntity>) {
    this.id = partial.id;
    this.name = partial.name;
    this.createdAt = setDate(partial.createdAt);
    this.updatedAt = setDate(partial.updatedAt);
    this.competitors = partial.competitors.map(CompetitorEntity.createInstance);
  }
}
