import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { CommonModule } from '@libs/common';
import { UploadsModule } from './uploads/uploads.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CommonModule, UploadsModule.forRoot({}), AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
