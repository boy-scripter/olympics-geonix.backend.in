import { IsString, IsEnum, IsMongoId } from "class-validator";
import { COMMENT_TYPES } from "@/src/interface/comment.interface";

export  class getPostDto {

    @IsString() @IsMongoId()
    postId: string;

    @IsString() @IsEnum(COMMENT_TYPES)
    postType: string;

}