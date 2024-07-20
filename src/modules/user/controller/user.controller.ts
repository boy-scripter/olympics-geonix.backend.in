import { Controller, Post, Body, Inject } from "@nestjs/common";
import { createUserDto } from "../dto/createUser.dto";
import UserService from "../service/user.service";

@Controller('/user')

export default class UserController {

    @Inject() private readonly userService: UserService;

    @Post('/register')
    async createUser(@Body() createUserData: createUserDto) {
        return this.userService.createUser(createUserData)
    }

}