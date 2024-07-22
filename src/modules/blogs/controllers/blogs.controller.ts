import { Controller, Post, Get, Body, Inject, Param } from "@nestjs/common";
import { BlogService } from "../service/blogs.service";
import { BLOG_MODEL, Blog } from "@schemas/blog/blog.schema";
import { InjectModel  } from "@nestjs/mongoose";
import { DATABASE_CONNECTION } from "@database/database.constant";
import { Model } from "mongoose";

@Controller('/blogs')
export class BlogController {


    @Inject() private readonly blogsService: BlogService;
    @InjectModel(BLOG_MODEL, DATABASE_CONNECTION.OLYMPICS) private readonly blogsModel: Model<Blog>;


    @Post()
    async CreateBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
        return this.blogsService.create(createBlogDto);
    }

    @Get()
    async GetAll(): Promise<Blog[]> {
        return this.blogsService.findAll();
    }

    @Get(':id')
    async GetSpecific(@Param('id') id: string): Promise<Blog> {
        return this.blogsService.findOne(id);
    }

    @Get('/top')
    async GetTopBlogs(@Param('id') id: string): Promise<Blog> {
        return this.blogsService.findOne(id);
    }

}