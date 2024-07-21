import { Injectable, InternalServerErrorException, HttpException, Session } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { createUserDto } from "../dto/createUser.dto";
import { DATABASE_CONNECTION } from "@database/database.constant";

import { QUESTION_MODEL, Question } from "@schemas/quiz/question/question.schema";
import { USER_MODEL, User } from "@schemas/quiz/user/user.schema";
import { ATTEMPT_MODEL, Attempt } from "@schemas/quiz/attempt/attempt.schema";

@Injectable()
export default class QuizService {

    @InjectModel(USER_MODEL, DATABASE_CONNECTION.OLYMPICS_QUIZ_2024) private readonly userModel: Model<User>;
    @InjectModel(QUESTION_MODEL, DATABASE_CONNECTION.OLYMPICS_QUIZ_2024) private readonly questionModel: Model<Question>;
    @InjectModel(ATTEMPT_MODEL, DATABASE_CONNECTION.OLYMPICS_QUIZ_2024) private readonly attemptModel: Model<Attempt>;

    async createUser(createUserData: createUserDto, session) {

        const isUserExist = await this.userModel.findOne({
            $or: [
                { email: createUserData.email },
                { mobile: createUserData.mobile }
            ]
        })
        if (isUserExist) throw new HttpException('user already exist', 400);

        const newUser = await new this.userModel(createUserData).save()
        if (!newUser) throw new InternalServerErrorException();

        session.user = newUser._id;
        return newUser;

    }

    async questionHandler() {
        const question = await this.randomQuestionPick();


    }

    private async randomQuestionPick() {
        return await this.questionModel.aggregate(
            [
                { $sample: { size: 1 } }
            ]
        )
    }


}