import { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICompetitor, IFight } from 'esport-lib-ts/lib/competitions';

@Schema({ timestamps: true })
export class Fight extends Document implements IFight {
  @Prop({ required: true })
  fightNumber: number;

  @Prop({ required: true })
  isProcessed: boolean;

  @Prop()
  winnerId?: string;

  @Prop({ required: true })
  accNumber: number;

  @Prop({
    required: true,
    // type: [{ type: mongoose.Schema.Types.ObjectId, ref: Competitor.name }],
  })
  // @Type(() => Competitor)
  competitors: ICompetitor[];

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const FightSchema = SchemaFactory.createForClass(Fight);
