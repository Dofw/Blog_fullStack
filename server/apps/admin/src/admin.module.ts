import { DbModule } from './../../../libs/db/src/db.module'; // 数据库模块链接
import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { UploadsController } from './uploads/uploads.controller';
import { UploadsService } from './uploads/uploads.service';

import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    DbModule,
    MulterModule.register({
      dest: '/uploads',
    }),
  ],
  controllers: [AdminController, UploadsController],
  providers: [AdminService, UploadsService],
})
export class AdminModule {}
