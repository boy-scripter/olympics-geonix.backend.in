import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';

export  class createUserDto {

    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsNotEmpty()
    @IsString()
    last_name: string;

    @IsNotEmpty()
    @IsNumber()
    mobile: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    gender: string;

    @IsNotEmpty()
    @IsString()
    dob: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    pincode: number;
}