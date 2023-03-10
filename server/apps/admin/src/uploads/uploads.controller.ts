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
  upload(@UploadedFile('file') files: Express.Multer.file) {
    console.log(files);
    return {
      url: `http://localhost:3300/${files.path}`,
    };
  }
}
