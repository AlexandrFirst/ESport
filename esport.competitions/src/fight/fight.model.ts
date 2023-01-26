import mongoose, { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Type } from 'class-transformer';
import { ICompetitor, IFight } from 'esport-lib-ts/lib/competitions';

import { Competitor } from '../competition/models/competitor.model';

@Schema({ timestamps: true })
export class Fight extends Document implements IFight {
  @Prop({ required: true })
  isProcessed: boolean;

  @Prop()
  winnerId?: string;

  @Prop({ required: true })
  accNumber: number;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Competitor.name }],
  })
  @Type(() => Competitor)
  competitors: ICompetitor[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const FightSchema = SchemaFactory.createForClass(Fight);
