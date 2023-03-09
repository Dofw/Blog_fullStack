import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(FileInterceptor('files', {}))
  upload(@UploadedFile('files') files: Express.Multer.File) {
    console.log(files);
    return {
      url: `http://localhost:3300/${file.path}`,
    };
  }
}
