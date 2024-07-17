import { IsNotEmpty, IsString } from "class-validator";

export default class loginUserDto {

    @IsNotEmpty()
    @IsString()
    email: string
}