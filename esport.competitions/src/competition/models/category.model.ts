import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ICategory, ICompatitor } from 'esport-lib-ts/lib/competitions';

import { CompetitorSchema } from './compatitor.model';

@Schema()
export class Category extends Document implements ICategory {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: [CompetitorSchema], _id: false })
  competitors: ICompatitor[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
