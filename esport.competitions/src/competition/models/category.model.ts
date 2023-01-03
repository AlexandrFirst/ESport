import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ICategory, IFight } from 'esport-lib-ts/lib/competitions';

import { FightSchema } from './fight.model';

@Schema()
export class Category extends Document implements ICategory {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: FightSchema, _id: false })
  fights: IFight[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
