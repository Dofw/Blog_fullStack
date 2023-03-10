import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { DbModule } from './../../../libs/db/src/db.module'; // 数据库模块链接
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [DbModule, UploadsModule.forRoot({})],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
