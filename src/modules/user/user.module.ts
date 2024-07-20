import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
    controllers: [UserController],
    imports: [],
    providers: [UserService]
})

export class UserModule { }