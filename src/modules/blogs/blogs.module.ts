import { Module } from "@nestjs/common";
import { BlogController } from "./controllers/blogs.controller";
import { BlogService } from "./service/blogs.service";

@Module({
    controllers: [BlogController],
    providers: [BlogService],
})

export class BlogsModule {}