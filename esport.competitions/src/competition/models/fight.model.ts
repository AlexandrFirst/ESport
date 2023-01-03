import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IFight } from 'esport-lib-ts/lib/competitions';

@Schema()
export class Fight extends Document implements IFight {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  categoryId: string;
}

export const FightSchema = SchemaFactory.createForClass(Fight);
