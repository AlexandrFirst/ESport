import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';

import { ICategory, IFight } from 'esport-lib-ts/lib/competition';

import { Fight } from '../fight/fight.model';

@Schema()
export class Category extends Document implements ICategory {
  @Prop({ required: true, set: (content: string) => content.trim() })
  title: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Fight.name }],
  })
  @Type(() => Fight)
  fights: IFight[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
