import { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IRound } from '@esport.monorepo/interfaces';

@Schema({ timestamps: true })
export class Round extends Document implements IRound {
  @Prop({ required: true })
  roundNumber: number;

  @Prop({ default: [], required: false })
  fights: string[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const RoundSchema = SchemaFactory.createForClass(Round);
