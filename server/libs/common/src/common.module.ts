import { Module } from '@nestjs/common';
// config
import { ConfigModule, ConfigService } from '@nestjs/config';
import { commonConfig, databaseConfig } from './confs';

// 数据库
// import { DbModule } from '@libs/db';
import { MysqlModule } from '@libs/mysql'; // 先学习mysql

// auth jwt
import { JwtModule } from '@nestjs/jwt';

const envFilePath =
  process.env.NODE_ENV === 'dev' ? ['.dev.env'] : ['.prod.env'];

/**
 * 导入的各自模块，属于 global
 * - 如果有某个模块无法设置global,手动exports设置global属性。
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [commonConfig, databaseConfig],
    }),

    JwtModule.registerAsync({
      global: true,
      async useFactory(configService: ConfigService) {
        const secret = configService.get<string>('jwt.secret');
        return {
          secret,
        };
      },
      inject: [ConfigService],
    }),
    // DbModule,
    MysqlModule,
  ],
  exports: [],
})
export class CommonModule {}
