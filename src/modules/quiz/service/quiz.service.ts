import { Injectable, InternalServerErrorException, HttpException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { USER_MODEL, User } from "@schemas/quiz/user/user.schema";
import { createUserDto } from "../dto/createUser.dto";
import { DATABASE_CONNECTION } from "@database/database.constant";

@Injectable()
export default class QuizService {

    @InjectModel(USER_MODEL, DATABASE_CONNECTION.OLYMPICS_QUIZ_2024) private readonly userModel: Model<User>;

    async createUser(createUserData: createUserDto) {

            const isUserExist = await this.userModel.findOne({
                $or: [
                    { email: createUserData.email },
                    { mobile: createUserData.mobile }
                ]
            })
            if (isUserExist) throw new HttpException('user already exist', 400);

            const newUser = await new this.userModel(createUserData).save()
            if (!newUser) throw new InternalServerErrorException();
            return newUser;

    }


}