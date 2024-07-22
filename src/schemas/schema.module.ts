import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "../database/database.constant";
import { Global } from "@nestjs/common";
import { BLOG_MODEL, BlogSchema } from "./blog/blog.schema";

const MODELS = [
    { name: BLOG_MODEL, schema: BlogSchema }
]

@Global()
@Module({
    imports: [MongooseModule.forFeature(MODELS, DATABASE_CONNECTION.OLYMPICS)],
    exports: [MongooseModule]
})

export class SchemaModule { }