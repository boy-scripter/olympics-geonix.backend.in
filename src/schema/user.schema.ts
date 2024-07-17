import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Player extends Document {
    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true, unique: true })
    mobile: number;

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

export const userSchema = SchemaFactory.createForClass(Player);
