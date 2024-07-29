
import { IsString  } from 'class-validator';

export class CreateNewsDto {
    @IsString()
    title: string;

    @IsString()
    sub_heading: string;
 
    @IsString()
    description: string;
}
