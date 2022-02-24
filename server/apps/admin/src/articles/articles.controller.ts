import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import Article from '@libs/db/models/article.model';
import { InjectModel } from 'nestjs-typegoose';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: ModelType<Article>,
  ) {}

  @ApiOperation({ summary: '文章列表' })
  @Get()
  async index() {
    const articles = await this.articleModel.find();
    return articles;
  }

  @ApiOperation({ summary: '文章详情' })
  @Get(':id')
  async detail(@Param('id') id: string) {
    return await this.articleModel.findById(id);
  }

  @ApiOperation({ summary: '创建文章' })
  @Post('create')
  async create(@Body() articleCreate: Article) {
    await this.articleModel.create(articleCreate);
    return {
      success: true,
    };
  }

  @ApiOperation({ summary: '更新文章' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() articleUpdate: Article) {
    await this.articleModel.findByIdAndUpdate(id, articleUpdate);
    return {
      success: true,
    };
  }

  @ApiOperation({ summary: '删除文章' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.articleModel.findByIdAndDelete(id);
    return {
      success: true,
    };
  }
}
