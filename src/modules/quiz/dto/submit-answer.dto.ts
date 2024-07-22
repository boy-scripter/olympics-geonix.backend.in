import { ANSWER_OPTIONS } from '@/src/interface/quiz.interface';
import { IsNotEmpty, IsString, IsMongoId, IsEnum } from 'class-validator';

export class SubmitAnswerDto {
    @IsMongoId() @IsNotEmpty()
    attemptId: string;

    @IsString() @IsNotEmpty() @IsEnum(ANSWER_OPTIONS)
    option: string;
}
