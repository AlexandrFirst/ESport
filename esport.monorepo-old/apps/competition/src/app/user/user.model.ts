import { Document, now } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IUser } from '@esport.monorepo/interfaces';

@Schema({ timestamps: true })
export class User extends Document implements IUser {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true, set: (content: string) => content.trim() })
  name: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
