import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICompetitor, IFight } from 'esport-lib-ts/lib/competitions';

import { CompetitorSchema } from './competitor.model';

@Schema()
export class Fight extends Document implements IFight {
  @Prop({ required: true })
  isProcessed: boolean;

  @Prop()
  winnerId?: string;

  @Prop({ required: true })
  accNumber: number;

  @Prop({ required: true, type: [CompetitorSchema], _id: false })
  competitors: ICompetitor[];
}

export const FightSchema = SchemaFactory.createForClass(Fight);
