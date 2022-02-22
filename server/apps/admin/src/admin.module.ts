import { DbModule } from './../../../libs/db/src/db.module'; // 数据库模块链接
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [ArticleModule, DbModule],
  controllers: [AdminController, ArticleController],
  providers: [AdminService],
})
export class AdminModule {}
