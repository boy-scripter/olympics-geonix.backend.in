import { Injectable } from "@nestjs/common";
import { InternalServerErrorException, HttpException } from "@nestjs/common";
import { createUserDto } from "./dto/index.dto";

@Injectable()
export class AuthService {

    async createUser() {
        if (await this.usersModel.findOne({ email: createUserDto.email })) throw new HttpException('email already in use', 400);

        const hashedPass = await this.hashString(createUserDto.password);
        const newUser = new this.usersModel({
            ...createUserDto,
            password: hashedPass,
        });

        const createdUser = await newUser.save();
        if (!createdUser) throw new InternalServerErrorException();

        return createdUser;
    }

}