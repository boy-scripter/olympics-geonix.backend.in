import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export default class loginUserDto {

    @IsEmail()
    email: string

    @IsNotEmpty() @IsString() @MinLength(8)
    password: string
}