import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { CompatitorType, ICompetitor } from 'esport-lib-ts/lib/competition';

@Schema()
export class Competitor extends Document implements ICompetitor {
  @Prop({ requred: true })
  displayName: string;

  @Prop()
  weight?: number;

  @Prop()
  height?: number;

  @Prop({ requred: true, enum: CompatitorType })
  type: CompatitorType;
}

export const CompetitorSchema = SchemaFactory.createForClass(Competitor);
