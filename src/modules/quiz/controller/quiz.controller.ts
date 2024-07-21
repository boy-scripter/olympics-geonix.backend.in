import { Controller, Post, Body, Inject } from "@nestjs/common";
import { createUserDto } from "../dto/createUser.dto";
import QuizService from "../service/quiz.service";

@Controller('/quiz')

export default class QuizController {

    @Inject() private readonly quizService: QuizService;

    @Post('/register')
    async createUser(@Body() createUserData: createUserDto) {
        return this.quizService.createUser(createUserData)
    }

}