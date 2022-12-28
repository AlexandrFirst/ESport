import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ICategory } from '../../../../esport.contracts-ts/src/interfaces/competition/category.interface';
import { ICompetition } from '../../../../esport.contracts-ts/src/interfaces/competition/competition.interface';

import { CategorySchema } from './category.model';

@Schema()
export class Competition extends Document implements ICompetition {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  dateStart: Date;

  @Prop({ required: false })
  dateEnd: Date;

  @Prop({ required: true })
  organizationId: number;

  @Prop({ required: true, type: [CategorySchema], _id: false })
  categories: ICategory[];
}

export const CompetitionSchema = SchemaFactory.createForClass(Competition);
