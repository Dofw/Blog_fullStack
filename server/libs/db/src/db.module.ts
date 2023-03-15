import { TypegooseModule } from 'nestjs-typegoose';
import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';

import User from './models/user.module';

// 注册所有的模型
const Models = TypegooseModule.forFeature([User]);
@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      async useFactory() {
        return {
          uri: process.env.DB,
        };
      },
    }),
    Models,
  ],
  providers: [DbService],
  exports: [DbService, Models],
})
export class DbModule {}
