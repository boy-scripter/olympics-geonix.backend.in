import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class News extends Document {

    @Prop({ required: true, type: String, trim: true })
    title: string;

    @Prop({ required: true, type: String })
    sub_heading: string;

    @Prop({ required: true, type: String })
    description: string;

    @Prop({ type: String })
    preview_image: string;

    @Prop({ type: [String] })
    image: string;

}

export const NewsSchema = SchemaFactory.createForClass(News);
export const NEWS_MODEL = News.name