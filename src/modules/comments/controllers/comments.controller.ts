import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { NewCommentDto } from "../dto/newComment.dto";
import CommentService from "../service/comments.service";


@Controller('/comments')
export default class CommentController {

    @Inject() private commentService: CommentService;

    @Post()
    CreateComment(@Body() comment: NewCommentDto) {
        return this.commentService.createComment(comment);
    }
    @Get()
    GetAllComments(@Query() size: number, @Query() page: number) {
        return this.commentService.allComments(size, page);
    }
}