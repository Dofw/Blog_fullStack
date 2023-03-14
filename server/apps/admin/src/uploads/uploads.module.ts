import { DynamicModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import * as multer from 'multer';
import { extname } from 'path'; // 获取扩展名
import { v4 as uuid } from 'uuid';

import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({})
export class UploadsModule {
  static forRoot(options: any): DynamicModule {
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
}
