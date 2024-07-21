import { ANSWER_OPTIONS } from '@interface/quiz.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { SELECT_STATUS } from '@interface/quiz.interface';

@Schema()
export class Attempt extends Document {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Question" })
    question: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, enum: ANSWER_OPTIONS })
    selected_option: ANSWER_OPTIONS;

    @Prop({ required: true, default: new Date(), type: Date })
    time: Date;

    @Prop({ required: true, enum: SELECT_STATUS , type : String })
    status: SELECT_STATUS;

}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
export const ATTEMPT_MODEL = Attempt.name
