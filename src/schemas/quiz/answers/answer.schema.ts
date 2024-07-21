import { ANSWER_OPTIONS } from '@/src/interface/quiz.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Answer extends Document {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Question" })
    question: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, type: [String] })
    options: string[];

    @Prop({ required: true, enum: ANSWER_OPTIONS, type: String })
    correct_option: ANSWER_OPTIONS;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
export const ANSWER_MODEL = Answer.name