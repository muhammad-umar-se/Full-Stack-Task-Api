import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export interface UserI {
  _id: Types.ObjectId;
  email: string;
  password: string;
}

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchemaFactory = SchemaFactory.createForClass(User);
