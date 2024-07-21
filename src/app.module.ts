import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import QuizModule from '@modules/quiz/quiz.module';
import QuizSchemaModule from './schemas/quiz/quiz.schema.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DatabaseModule,
    QuizModule,
    QuizSchemaModule
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule { }
