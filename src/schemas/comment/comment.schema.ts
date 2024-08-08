import { Schema } from "@nestjs/mongoose";
import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { COMMENT_TYPES } from "@interface/comment.interface";
import mongoose, { Document } from "mongoose";

@Schema({ timestamps: true })
export default class Comment extends Document {

    @Prop({ required: true, type: String })
    content: string;

    @Prop({ required: true, type: String })
    name: string;

    @Prop({ required: true, type: String })
    email: string;

    @Prop({ required: true, enum: COMMENT_TYPES })
    post: COMMENT_TYPES;

    @Prop({ required: true, refPath: 'post', type: mongoose.Schema.Types.ObjectId })
    postId: mongoose.Schema.Types.ObjectId;

}


export const CommentSchema = SchemaFactory.createForClass(Comment);
export const COMMENT_MODEL = Comment.name
