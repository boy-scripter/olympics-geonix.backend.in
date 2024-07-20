import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UserController from './controller/user.controller';
import UserService from './service/user.service';
import User, { UserSchema } from './schema/user.schema';

@Module({
    controllers: [UserController],
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UserService],
    exports: [UserService]
})

export default class UserModule { }