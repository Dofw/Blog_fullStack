import { DbModule } from './../../../libs/db/src/db.module'; // 数据库模块链接
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { ArticleModule } from './articles/articles.module';
import { ArticleController } from './articles/articles.controller';
import { UploadsController } from './uploads/uploads.controller';
import { UploadsService } from './uploads/uploads.service';

@Module({
  imports: [ArticleModule, DbModule],
  controllers: [AdminController, ArticleController, UploadsController],
  providers: [AdminService, UploadsService],
})
export class AdminModule {}
