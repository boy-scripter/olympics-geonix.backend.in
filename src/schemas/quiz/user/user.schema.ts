import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string

    @Prop({ required: true, unique: true })
    mobile: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    gender: string;

    @Prop({ required: true })
    dob: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    password: string;

    // @Prop({ required: true })
    // state: string;

    // @Prop({ required: true })
    // address: string;

    // @Prop({ required: true })
    // pincode: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const USER_MODEL = User.name
