import { TypegooseModule } from 'nestjs-typegoose';
import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';

// article 模型
import Article from './models/article.model';

// 注册所有的模型
const Models = TypegooseModule.forFeature([Article]);
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
