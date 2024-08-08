import { COMMENT_TYPES } from "@interface/comment.interface";
import { IsString, MinLength, IsEnum } from "class-validator";

export class NewCommentDto {

    @IsString() @MinLength(3)
    content: string;

    @IsString() @MinLength(3)
    name: string;

    @IsString() @MinLength(4)
    email: string;

    @IsString() @IsEnum(COMMENT_TYPES)
    commentOn: string;

    @IsString() @IsEnum(COMMENT_TYPES)
    commentOnId: string;


}