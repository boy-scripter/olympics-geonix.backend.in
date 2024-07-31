import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question extends Document {

  @Prop({ required: true, type: String })
  text: string;

  @Prop({ required: true, type: Number })
  time_provide: number;

}

export const QuestionSchema = SchemaFactory.createForClass(Question);
export const QUESTION_MODEL = Question.name