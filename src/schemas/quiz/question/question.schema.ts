import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Question extends Document {

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Schema.Types.ObjectId

  @Prop({ required: true, type: String })
  question_text: string;

  @Prop({ required: true, type: Date })
  time_provide: Date;

  @Prop({ required: true, type: Number })
  score: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
export const QUESTION_MODEL = Question.name