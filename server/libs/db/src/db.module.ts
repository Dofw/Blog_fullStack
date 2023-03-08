import { TypegooseConnectionOptions, TypegooseModule } from 'nestjs-typegoose';
import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';

// article 模型
import Article from './models/article.model';

// 注册所有的模型
const Models = TypegooseModule.forFeature([Article]);
@Global()
@Module({
  imports: [
    TypegooseModule.forRoot(
      'mongodb://localhost/blog',
      {} as TypegooseConnectionOptions,
    ),
    Models,
  ],
  providers: [DbService],
  exports: [DbService, Models],
})
export class DbModule {}
