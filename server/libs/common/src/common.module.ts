import { Module } from '@nestjs/common';
import { CommonService } from './common.service';

import { DbModule } from '@libs/db';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'], // 前面优先级高。
    } as ConfigModuleOptions),
    DbModule,
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
