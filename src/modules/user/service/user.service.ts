import { Injectable, InternalServerErrorException, HttpException } from "@nestjs/common";
import User from "../schema/user.schema";
import { Model } from "mongoose";
import { createUserDto } from "../dto/createUser.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export default class UserService {

    @InjectModel(User.name) private readonly userModel: Model<User>;

    async createUser(createUserData: createUserDto) {

        const isUserExist = await this.userModel.findOne({
            $or: [
                { email: createUserData.email },
                { mobile: createUserData.mobile }
            ]
        })
        console.log(isUserExist)

        if (isUserExist) throw new HttpException('user already exist', 400);

        const newUser = await new this.userModel(createUserData).save()
        if (!newUser) throw new InternalServerErrorException();
        return newUser;

    }


}