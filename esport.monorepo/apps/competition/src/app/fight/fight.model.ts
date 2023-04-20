import { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ICompetitor, IFight } from '@esport.monorepo/interfaces';

@Schema({ timestamps: true })
export class Fight extends Document implements IFight {
  @Prop()
  isProcessed: boolean;

  @Prop()
  winnerId?: string;

  @Prop()
  fightNumber: number;

  @Prop()
  competitors: ICompetitor[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const FightSchema = SchemaFactory.createForClass(Fight);
