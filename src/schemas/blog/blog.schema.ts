
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })

export class Blog extends Document {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop()
    preview_image: string;

    @Prop({ required: true })
    sub_heading: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
export const BLOG_MODEL = Blog.name
