import { DbModule } from './../../../libs/db/src/db.module'; // 数据库模块链接
import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { UploadsController } from './uploads/uploads.controller';
import { UploadsService } from './uploads/uploads.service';

import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'; // 使用multer

@Module({
  imports: [
    DbModule,
    MulterModule.register({
      storage: multer.diskStorage({
        // 存储路径
        destination: function (req, file, cb) {
          cb(null, 'assets/');
        },
        // 保存文件
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      }),
      preservePath: true,
    }),
  ],
  controllers: [AdminController, UploadsController],
  providers: [AdminService, UploadsService],
})
export class AdminModule {}
