import { IsEmail, IsNotEmpty, IsString, Min, Matches, IsIn, MinLength } from 'class-validator';

export class createUserDto {

    @MinLength(3)
    first_name: string;

    @MinLength(3)
    last_name: string;

    @Matches(/^[6789]\d{9}$/, { message: "Invalid Phone Number" })
    mobile: string;

    @IsEmail()
    email: string;

    @IsIn(['MALE', 'FEMALE', 'BINARY'])
    gender: string;

    @IsNotEmpty() @IsString() @Matches(/^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$/, { message: "Date Of Birth is invalid" })
    dob: string;

    @IsNotEmpty() @IsString()
    city: string;

    @IsNotEmpty() @IsString()
    state: string;

    @IsNotEmpty() @IsString()
    address: string;

    @IsNotEmpty() @Min(110001, { message: "Pincode is Invalid" })
    pincode: number;
}