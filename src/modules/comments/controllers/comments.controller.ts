import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { NewCommentDto, getPostDto } from "../dto/index.dto";
import CommentService from "../service/comments.service";



@Controller('/comments')
export default class CommentController {

    @Inject() private commentService: CommentService;

    @Post()
    CreateComment(@Body() comment: NewCommentDto) {
        return this.commentService.createComment(comment);
    }
    @Post('specific')
    GetCommentById(@Query() size: number, @Query() page: number, @Body() postInfo: getPostDto) {
        return this.commentService.allComments(size, page, postInfo);
    }
}