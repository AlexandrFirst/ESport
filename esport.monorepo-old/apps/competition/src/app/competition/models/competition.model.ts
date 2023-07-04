import { ICompetition } from '@esport.monorepo/interfaces';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, now } from 'mongoose';

import { Category } from '../../category/models/category.model';

@Schema({ timestamps: true })
export class Competition extends Document implements ICompetition {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  dateStart: string;

  @Prop({ required: false })
  dateEnd: string;

  @Prop({ required: true })
  organizationId: number;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
  })
  // @Type(() => Category)
  categories: string[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const CompetitionSchema = SchemaFactory.createForClass(Competition);
