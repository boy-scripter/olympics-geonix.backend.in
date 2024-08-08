import { Module } from "@nestjs/common";
import CommentController from "./controllers/comments.controller";


@Module({
    exports: [],
    controllers: [CommentController],
    providers: [],
})export class CommentsModule { }