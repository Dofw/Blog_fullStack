import { Module } from '@nestjs/common';
import { CommonService } from './common.service';

// import { DbModule } from '@libs/db';
import { MysqlModule } from '@libs/mysql'; // 先学习mysql
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Global } from '@nestjs/common/decorators';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'], // 前面优先级高。
    } as ConfigModuleOptions),

    JwtModule.registerAsync({
      async useFactory() {
        return {
          secret: process.env.SECRET,
        };
      },
    }),

    // DbModule,
    MysqlModule,
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
