import { Controller, Post, Body, Inject } from "@nestjs/common";
import { createUserDto } from "../dto/createUser.dto";
import { UserService } from "../service/user.service";

@Controller('/user')

export class UserController {

    @Inject() private readonly userService: UserService;

    @Post('/register')
    async createUser(@Body() createUserDto: createUserDto) {
        return this.userService.createUser(createUserDto)
    }
}