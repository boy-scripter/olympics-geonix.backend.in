import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseOptionsFactory, MongooseModuleOptions } from "@nestjs/mongoose";

@Injectable()
export class MongooseOlympicsConfigService implements MongooseOptionsFactory {

    constructor(private configService: ConfigService) { }

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        return { uri: this.configService.get('OLYMPICS_DATABASE_URI') };
    }
}

@Injectable()
export class MongooseOlympicsQuiz2024ConfigService implements MongooseOptionsFactory {

    constructor(private configService: ConfigService) { }

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        return { uri: this.configService.get('OLYMPICS_QUIZ_2024_DATABASE_URI') };
    }
}