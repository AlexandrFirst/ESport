import mongoose, { Document, now, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import {
  CompatitorType,
  ICompetitor,
  IFight,
} from '@esport.monorepo/interfaces';

import { User } from '../user/user.model';

@Schema({ timestamps: true })
export class Competitor extends Document implements ICompetitor {
  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  userId?: string;

  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }],
  })
  teamMemberIds?: string[];

  @Prop({ required: false })
  teamName?: string;

  @Prop({ required: false })
  weight?: number;

  @Prop({ required: false })
  height?: number;

  @Prop({ required: true, enum: CompatitorType, type: String })
  competitorType: CompatitorType;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const CompetitorSchema = SchemaFactory.createForClass(Competitor);

@Schema({ timestamps: true })
export class Fight extends Document implements IFight {
  @Prop()
  isProcessed: boolean;

  @Prop()
  winnerId?: string;

  @Prop()
  fightNumber: number;

  @Prop({ type: [CompetitorSchema], _id: false })
  competitors: Types.Array<Competitor>;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const FightSchema = SchemaFactory.createForClass(Fight);
