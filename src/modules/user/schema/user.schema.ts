// src/user/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export default class User extends Document {
    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true, unique: true })
    mobile: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    gender: string;

    @Prop({ required: true })
    dob: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    pincode: number;
}

export const UserSchema = SchemaFactory.createForClass(User);