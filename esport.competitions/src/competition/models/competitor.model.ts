import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CompatitorType, ICompetitor } from 'esport-lib-ts/lib/competitions';

@Schema()
export class Competitor extends Document implements ICompetitor {
  @Prop({ required: false })
  userId?: number;

  @Prop({ required: false })
  team?: number[];

  @Prop({ required: false })
  teamName?: string;

  @Prop({ required: false })
  weight?: number;

  @Prop({ required: false })
  height?: number;

  @Prop({ requred: true, enum: CompatitorType })
  type: CompatitorType;
}

export const CompetitorSchema = SchemaFactory.createForClass(Competitor);
