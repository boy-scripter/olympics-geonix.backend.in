import { Module , Global } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../database/database.constant";

import { BLOG_MODEL, BlogSchema } from "./blog/blog.schema";
import { NEWS_MODEL , NewsSchema } from "./news/news.schema";

const MODELS = [
    { name: BLOG_MODEL, schema: BlogSchema },
    { name: NEWS_MODEL, schema: NewsSchema }
]

@Global()
@Module({
    imports: [MongooseModule.forFeature(MODELS, DATABASE_CONNECTION.OLYMPICS)],
    exports: [MongooseModule]
})

export default class SchemaModule { }