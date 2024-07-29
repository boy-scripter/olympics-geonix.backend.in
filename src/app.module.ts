import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@database/database.module';
import { NewsModule } from '@modules/news/news.module';

import QuizModule from '@modules/quiz/quiz.module';
import QuizSchemaModule from '@schemas/quiz/quiz.schema.module';
import SchemaModule from './schemas/schema.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),

    /** database start Schemas */
    DatabaseModule,
    QuizSchemaModule,
    SchemaModule,
    /** database end Schemas */

    QuizModule,
    NewsModule
  ],
  controllers: [AppController],
  providers: [],
})

export class AppModule { }
