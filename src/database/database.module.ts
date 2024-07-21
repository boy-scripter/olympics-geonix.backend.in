import { Module } from "@nestjs/common";
import { DATABASE_CONNECTION } from "./database.constant";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseOlympicsConfigService, MongooseOlympicsQuiz2024ConfigService } from "./moongoseModule.config";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            connectionName: DATABASE_CONNECTION.OLYMPICS,
            useClass: MongooseOlympicsConfigService
        }),
        MongooseModule.forRootAsync({
            connectionName: DATABASE_CONNECTION.OLYMPICS_QUIZ_2024,
            useClass: MongooseOlympicsQuiz2024ConfigService
        })
    ],
    exports: [MongooseModule]
})

export class DatabaseModule { }