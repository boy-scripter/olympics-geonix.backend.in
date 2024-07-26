import { IsEmail, IsNotEmpty, IsString, Matches, IsIn, MinLength } from 'class-validator';

export class createUserDto {

    @IsNotEmpty() @MinLength(3)
    name: string

    @IsNotEmpty() @Matches(/^[6789]\d{9}$/, { message: "Invalid Phone Number" })
    mobile: string;

    @IsNotEmpty() @IsString() @MinLength(8)
    password: string;

    @IsEmail()
    email: string;

    @IsIn(['MALE', 'FEMALE', 'BINARY'])
    gender: string;

    @IsNotEmpty() @IsString() @Matches(/^(\d{4})-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])$/, { message:  "Date Of Birth is invalid" })
    dob: string;

    @IsNotEmpty() @IsString()
    city: string;

    // @IsNotEmpty() @IsString()
    // state: string;

    // @IsNotEmpty() @IsString()
    // address: string;

    // @IsNotEmpty() @Min(110001, { message: "Pincode is Invalid" })
    // pincode: number;
}