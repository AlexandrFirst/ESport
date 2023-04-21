import { ICategory } from '@esport.monorepo/interfaces';
import mongoose, { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Round } from './round.model';

@Schema({ timestamps: true })
export class Category extends Document implements ICategory {
  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Round.name }],
  })
  rounds: string[];

  @Prop({ required: true, set: (content: string) => content.trim() })
  title: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
