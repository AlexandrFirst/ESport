import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';

import { ICategory, ICompetition } from 'esport-lib-ts/lib/competitions';

import { Category } from '../category/category.model';

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

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
  })
  @Type(() => Category)
  categories: ICategory[];
}

export const CompetitionSchema = SchemaFactory.createForClass(Competition);
