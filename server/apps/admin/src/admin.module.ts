import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

import { CommonModule } from '@libs/common';
import { UploadsModule } from './uploads/uploads.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import ResInterceptor from './_function/interceptors/res.interceptor';
import { GlobalErrorFilter } from './_function/errorFilter/global.filter';
import JwtGuard from './auth/jwt.guard';

@Module({
  imports: [CommonModule, UploadsModule.forRoot({}), AuthModule],
  controllers: [AdminController],
  providers: [
    AdminService,
    // 全局的第二种方式，main中存在useGlobalFilters，则无效。
    {
      provide: APP_FILTER,
      useClass: GlobalErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard, //  继承自 AuthGuard('jwt'), imports AuthModule 必须也注入才能访问到 jwtStratege
    },
  ],
})
export class AdminModule {}
