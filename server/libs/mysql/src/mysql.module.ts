import { LoginUser } from './models/loginUser.entity';
import { ConfigService } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { TypeOrmModule, type TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as path from 'path';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          autoLoadEntities: true, // 自动载入实体
          entities: [
            path.join(__dirname, '../src/models/**/*.entity{.ts,.js}'),
          ],
          synchronize: true, //// 实体与表同步 调试模式下开始。不然会有强替换导致数据丢是. 生产不使用这种。
        };
      },
    } as TypeOrmModuleAsyncOptions),
  ],
  providers: [MysqlService],
  exports: [MysqlService],
})
export class MysqlModule {}
