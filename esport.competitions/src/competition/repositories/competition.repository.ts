import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Competition } from '../models/competition.model';
import { CompetitionEntity } from '../entities/competition.entity';

@Injectable()
export class CompetitionRepository {
  constructor(
    @InjectModel(Competition.name)
    private readonly competitionModel: Model<Competition>,
  ) {}

  async createCompetition(c: CompetitionEntity) {
    const newComp = new this.competitionModel(c);
    return newComp.save();
  }
}
