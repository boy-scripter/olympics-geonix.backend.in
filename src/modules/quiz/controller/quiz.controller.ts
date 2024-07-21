import { Controller, Post, Body, Inject, Session, Get } from "@nestjs/common";
import { createUserDto } from "../dto/createUser.dto";
import QuizService from "../service/quiz.service";


@Controller('/quiz')

export default class QuizController {

    @Inject() private readonly quizService: QuizService;

    @Post('/register')
    async CreateUser(@Body() createUserData: createUserDto, @Session() session: Record<string, any>) {
        return this.quizService.createUser(createUserData, session)
    }

    @Get('/question')
    async QuestionHandler() {
        
    }

}