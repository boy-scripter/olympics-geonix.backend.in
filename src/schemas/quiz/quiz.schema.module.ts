import { Global, Module } from "@nestjs/common";
import { ModelDefinition, MongooseModule } from "@nestjs/mongoose";

import { USER_MODEL, UserSchema } from "@schemas/quiz/user/user.schema";
import { QUESTION_MODEL, QuestionSchema } from "@schemas/quiz/question/question.schema";
import { PLAYER_MODEL, PlayerScoreSchema } from "./player_score/player_score.schema";
import { ANSWER_MODEL, AnswerSchema } from "./answers/answer.schema";
import { ATTEMPT_MODEL, AttemptSchema } from "./attempt/attempt.schema";
import { DATABASE_CONNECTION } from "@/src/database/database.constant";

const QUIZ_MODEL : ModelDefinition[] = [
    { name: USER_MODEL, schema: UserSchema },
    { name: QUESTION_MODEL, schema: QuestionSchema },
    { name: PLAYER_MODEL, schema: PlayerScoreSchema },
    { name: ANSWER_MODEL, schema: AnswerSchema },
    { name: ATTEMPT_MODEL, schema: AttemptSchema }
]

@Global()
@Module({
    imports: [MongooseModule.forFeature(QUIZ_MODEL, DATABASE_CONNECTION.OLYMPICS_QUIZ_2024)],
    exports: [MongooseModule]
})

export default class QuizSchemaModule { }