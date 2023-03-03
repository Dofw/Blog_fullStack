import { Body, Controller, Get, Req, Res } from '@nestjs/common';

@Controller('uploads')
export class UploadsController {
  @Get()
  upload(@Req() req: any) {
    // res.send('123');
    return 'upload';
  }
}
