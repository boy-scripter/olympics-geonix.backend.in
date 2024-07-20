import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength , } from 'class-validator';

export class createUserDto {

    @IsNotEmpty() @IsString() @MinLength(3) @MaxLength(25)
    first_name: string;

    @IsNotEmpty() @IsString()
    last_name: string;

    @IsNotEmpty() @IsNumber() @MinLength(10) @MaxLength(10)
    mobile: number;

    @IsNotEmpty() @IsEmail()
    email: string;

    @IsNotEmpty() @IsString()
    gender: string;

    @IsNotEmpty() @IsString() @IsDate()
    dob: string;

    @IsNotEmpty() @IsString()
    city: string;

    @IsNotEmpty() @IsString()
    state: string;

    @IsNotEmpty() @IsString()
    address: string;

    @IsNotEmpty() @IsNumber() 
    pincode: number;
}