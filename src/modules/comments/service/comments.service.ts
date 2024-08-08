import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NewCommentDto, getPostDto } from "../dto/index.dto";
import Comment, { COMMENT_MODEL } from "@schemas/comment/comment.schema";
import { DATABASE_CONNECTION } from "@database/database.constant";

@Injectable()
export default class CommentService {

    @InjectModel(COMMENT_MODEL, DATABASE_CONNECTION.OLYMPICS) private commentModel: Model<Comment>;

    async createComment(comment: NewCommentDto) {
        const newComment = new this.commentModel(comment);
        return (await newComment.save()).toObject();
    }

    async allComments(size: number, page: number, postInfo: getPostDto) {
        const commentList = await this.commentModel.find().sort({ createdAt: -1 }).skip(page).limit(size).exec();
        return commentList
    }

}