import { Controller, Get, Res } from '@nestjs/common';
import { type Response } from 'express';
import { join, resolve } from "node:path"

@Controller()
export class AppController {


  @Get()
  getHello(): string {
    return "Geonix";
  }

  @Get('admin')
  admin(@Res() response: Response) {
    return response.sendFile(join(resolve(), 'admin/news_article.html'))
  }
}


