import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import * as multer from 'multer';
import { extname } from 'path'; // 获取扩展名
import { v4 as uuid } from 'uuid';

import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { UploadsMiddleware } from './uploads.middleware';

@Module({})
export class UploadsModule implements NestModule {
  static forRoot(options: any): DynamicModule {
    // 基于 options 对象的属性自定义其service行为等。

    // 了解provider
    const providers = [
      UploadsService,
      {
        provide: 'CONFIG_OPTIONS', // symbol
        useValue: options,
      },
    ];

    return {
      module: UploadsModule,
      imports: [
        MulterModule.register({
          storage: multer.diskStorage({
            destination: 'assets/', // 可以是函数
            filename: function (req, file, cb) {
              cb(null, `${uuid()}${extname(file.originalname)}`);
            },
          }),
        }),
      ],
      providers,
      controllers: [UploadsController],
    };
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UploadsMiddleware).exclude('uploads');
  }
}
