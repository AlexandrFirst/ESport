import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ICompatitor } from '../../../../esport.contracts-ts/src/interfaces/competition/compatitor.interface';
import { CompatitorType } from 'src/enums/compatitorType.enum';

@Schema()
export class Competitor extends Document implements ICompatitor {
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
