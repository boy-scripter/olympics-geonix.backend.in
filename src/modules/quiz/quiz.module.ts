import { Module } from '@nestjs/common';
import QuizController from './controller/quiz.controller';
import QuizService from './service/quiz.service';

@Module({
    controllers: [QuizController],
    providers: [QuizService],
    exports: [QuizService]
})

export default class QuizModule { }