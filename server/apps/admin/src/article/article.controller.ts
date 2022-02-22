import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

class ArticleType {}

@ApiTags('article')
@Controller('article')
export class ArticleController {
  @ApiOperation({ summary: '获取文章列表' })
  @Get('list')
  index(@Body() articleData: ArticleType) {
    return articleData;
  }

  @ApiOperation({ summary: '创建文章' })
  @Post('create')
  create() {
    return;
  }

  @ApiOperation({ summary: '更新文章' })
  @Put('update')
  update() {
    return;
  }

  @ApiOperation({ summary: '删除文章' })
  @Delete('remove')
  remove() {
    return;
  }
}
