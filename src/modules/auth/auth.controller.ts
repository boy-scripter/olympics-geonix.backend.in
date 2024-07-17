import { Controller, Get } from "@nestjs/common";

@Controller('/user')

export class AuthController {

    @Get('/register')
    registration() {

    }
}