import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CategorySchema } from './category.model';
import { ICategory, ICompetition } from 'esport-lib-ts/lib/competitions';

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
