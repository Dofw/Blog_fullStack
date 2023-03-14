import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsInterceptor } from './uploads.interceptor';

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(FileInterceptor('files', {}))
  upload(@UploadedFile('file') files: Express.Multer.File) {
    console.log(files);
    return {
      url: `http://localhost:3300/${files.path}`,
    };
  }

  @Get('test')
  @UseInterceptors(UploadsInterceptor)
  index(@Req() req: any) {
    console.log(req.$$$test);
    req.$$$test = 'new12321';
    return {
      $$$test: req.$$$test,
    };
  }
}
