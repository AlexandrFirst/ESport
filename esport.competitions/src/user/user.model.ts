import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from 'esport-lib-ts/lib/competitions/interfaces/user.interface';

@Schema()
export class User extends Document implements IUser {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
