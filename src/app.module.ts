import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import UserModule from './modules/user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/olympics-quiz-2024?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.0'),
    UserModule
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule { }
