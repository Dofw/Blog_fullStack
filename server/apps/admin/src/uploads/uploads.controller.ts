import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  @ApiOperation({ summary: '上传' })
  @Post()
  @UseInterceptors(FileInterceptor('files', {}))
  upload(@UploadedFile('file') files: Express.Multer.File) {
    console.log(files);
    return {
      filename: files.originalname,
      size: files.size,
      mimetype: files.mimetype,
      url: `http://localhost:3300/${files.path}`,
    };
  }
}
