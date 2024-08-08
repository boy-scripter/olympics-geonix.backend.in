import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NewCommentDto } from "../dto/index.dto";
import Comment from "@schemas/comment/comment.schema";

@Injectable()
export default class CommentService {

    @InjectModel('Comment') private commentModel: Model<Comment>;

    async createComment(comment: NewCommentDto) {
        const newComment = new this.commentModel(comment);
        return (await newComment.save()).toObject();
    }

    async allComments(size: number, page: number) {
        const commentList = await this.commentModel.find().sort({ createdAt: -1 }).skip(page).limit(size).exec();
        return commentList
    }

}