import mongoose, { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';

import { ICategory, IFight } from 'esport-lib-ts/lib/competitions';

import { Fight } from '../fight/fight.model';

@Schema({ timestamps: true })
export class Category extends Document implements ICategory {
  @Prop({ required: true, set: (content: string) => content.trim() })
  title: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Fight.name }],
  })
  @Type(() => Fight)
  fights: IFight[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
