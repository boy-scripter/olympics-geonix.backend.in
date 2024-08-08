import { Module } from "@nestjs/common";
import CommentController from "./controllers/comments.controller";
import CommentService from "./service/comments.service";


@Module({
    controllers: [CommentController],
    providers: [CommentService],
})
export default class CommentsModule { }