import { Injectable, InternalServerErrorException, HttpException, NotFoundException, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";

import { createUserDto, SubmitAnswerDto } from "../dto/index.dto";
import { DATABASE_CONNECTION } from "@database/database.constant";

import { QUESTION_MODEL, Question } from "@schemas/quiz/question/question.schema";
import { USER_MODEL, User } from "@schemas/quiz/user/user.schema";
import { ATTEMPT_MODEL, Attempt } from "@schemas/quiz/attempt/attempt.schema";
import { PLAYER_SCORE_MODEL, PlayerScore } from "@schemas/quiz/player_score/player_score.schema";
import { ANSWER_MODEL, Answer } from "@schemas/quiz/answers/answer.schema";
import { PLAYING_STATUS, SELECT_STATUS } from "@interface/quiz.interface";
import loginUserDto from "../dto/loginUser.dto";

@Injectable()
export default class QuizService {

    @InjectModel(USER_MODEL, DATABASE_CONNECTION.OLYMPICS_QUIZ_2024) private readonly userModel: Model<User>;
    @InjectModel(QUESTION_MODEL, DATABASE_CONNECTION.OLYMPICS_QUIZ_2024) private readonly questionModel: Model<Question>;
    @InjectModel(ATTEMPT_MODEL, DATABASE_CONNECTION.OLYMPICS_QUIZ_2024) private readonly attemptModel: Model<Attempt>;
    @InjectModel(PLAYER_SCORE_MODEL, DATABASE_CONNECTION.OLYMPICS_QUIZ_2024) private readonly playerModel: Model<PlayerScore>;
    @InjectModel(ANSWER_MODEL, DATABASE_CONNECTION.OLYMPICS_QUIZ_2024) private readonly answerModel: Model<Answer>;

    async createUser(createUserData: createUserDto, session: Record<string, any>): Promise<User> {
        const isUserExist = await this.userModel.findOne({
            $or: [
                { email: createUserData.email },
                { mobile: createUserData.mobile }
            ]
        })
        if (isUserExist) throw new BadRequestException('user already exist');

        const hashPass = bcrypt.hashSync(createUserData.password.toString(), 10)
        createUserData.password = hashPass

        const newUser = await new this.userModel(createUserData).save()
        if (!newUser) throw new InternalServerErrorException();

        session.user = Object.assign(newUser.toObject(), { password: undefined });;
        return session.user;
    }

    async loginUser(userData: loginUserDto, session: Record<string, any>): Promise<User> {

        const user = await this.userModel.findOne({ email: userData.email }).exec();
        if (!user) throw new BadRequestException('Invalid credentials');

        const isPasswordMatch = bcrypt.compareSync(userData.password, user.password);
        if (!isPasswordMatch) throw new BadRequestException('Invalid credentials');

        session.user = Object.assign(user.toObject(), { password: undefined });;
        return session.user;
    }


    async getRandomQuestionForUser(userId: string): Promise<any> {

        const attemptsCount = await this.attemptModel.countDocuments({ user: userId }).exec();
        if (attemptsCount >= 3) throw new BadRequestException('You Already Attempted Your 3 questions');
        const attempts = await this.attemptModel.find({ user: userId }).select('question').exec();
        const attemptedQuestionIds = attempts.map(attempt => attempt.question);

        const randomQuestions = await this.questionModel.aggregate([
            { $match: { _id: { $nin: attemptedQuestionIds } } },
            { $sample: { size: 1 } },
        ]).exec();

        const isAttemptsaved = await new this.attemptModel({ user: userId, question: randomQuestions[0]._id, time: new Date() }).save()
        if (!isAttemptsaved) throw new InternalServerErrorException("something went wrong");
        const answer = await this.answerModel.findOne({ question: randomQuestions[0]._id })

        return {
            ...randomQuestions[0],
            _id: undefined,
            answers: answer.toObject().options,
            attempt: isAttemptsaved._id
        };
    }

    async submitAnswer(submitAnswerDto: SubmitAnswerDto, userid: string) {

        const { attemptId, option } = submitAnswerDto;

        const attempt = await this.attemptModel.findOne({ _id: attemptId, user: userid }).exec();
        if (!attempt) throw new NotFoundException('Question not found');
        if (attempt.status != SELECT_STATUS.NOT_ANSWERED) throw new BadRequestException("Unable to Save the Answer")
        attempt.selected_option = option

        const now = new Date();
        const attemptTime = new Date(attempt.time);
        const diffInSeconds = (now.getTime() - attemptTime.getTime()) / 1000;
        if (diffInSeconds > 100) throw new HttpException('oops timeout for this question', 422);

        const answer = await this.answerModel.find({ question: attempt.question, correct_option: option }).exec();

        if (!answer.length) {
            attempt.status = SELECT_STATUS.WRONG
            await attempt.save();
            return { status: SELECT_STATUS.WRONG, selected_option: option };
        }

        //increase score
        const player_score = await this.playerModel.findOneAndUpdate(
            { user: attempt.user },
            { $inc: { total_score: 20 } },
            { new: true }
        )

        attempt.status = SELECT_STATUS.CORRECT
        await attempt.save();


        return {
            ...player_score.toObject(),
            status: attempt.status
        }
    }


    async startGame(userId: string): Promise<PlayerScore> {

        const player = await this.playerModel.findOne({ user: userId, status: { $in: [PLAYING_STATUS.FINISHED, PLAYING_STATUS.ABORTED] } }).exec();
        if (player) throw new UnauthorizedException("Already Played")

        const score = new this.playerModel({ user: userId }).save()
        return score
    }

    async finishGame(userId: string): Promise<PlayerScore> {
        const player = await this.playerModel.findOneAndUpdate(
            { user: userId, status: PLAYING_STATUS.STARTED },
            { status: PLAYING_STATUS.FINISHED, finished_time: new Date() },
            { new: true }
        ).exec();

        if (!player) throw new NotFoundException('Player not found or game already finished');
        return player;
    }



}