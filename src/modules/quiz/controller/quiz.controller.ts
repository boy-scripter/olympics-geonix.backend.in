import { Controller, Post, Body, Inject, Session, Get, UnauthorizedException } from "@nestjs/common";
import { createUserDto } from "../dto/createUser.dto";
import { SubmitAnswerDto } from "../dto/submit-answer.dto";
import QuizService from "../service/quiz.service";


@Controller('/quiz')

export default class QuizController {

    @Inject() private readonly quizService: QuizService;

    @Post('/register')
    async CreateUser(@Body() createUserData: createUserDto, @Session() session: Record<string, any>) {
        return this.quizService.createUser(createUserData, session)
    }

    @Get('/question')
    async QuestionHandler(@Session() session: Record<string, any>) {
        if (!session.user) throw new UnauthorizedException()
        return this.quizService.getRandomQuestionForUser(session.user._id)
    }

    @Post('/submit_answer')
    async SubmitAnswer(@Body() SubmitAnswerDto: SubmitAnswerDto,@Session() session: Record<string, any>) {
        if (!session.user) throw new UnauthorizedException()
        return this.quizService.submitAnswer(SubmitAnswerDto, session.user._id)
    }

    @Get('/start_play')
    async StartPlay(@Session() session: Record<string, any>) {
        if (!session.user) throw new UnauthorizedException()
        return this.quizService.startGame(session.user._id)
    }

    @Get('/finished')
    async GameFinshed(@Session() session: Record<string, any>) {
        if (!session.user) throw new UnauthorizedException()
        return this.quizService.finishGame(session.user._id)
    }

}