import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadsService } from './uploads/uploads.service';

@ApiTags('默认')
@Controller()
export class AdminController {
  constructor(private readonly upService: UploadsService) {}

  @ApiOperation({ summary: '初始' })
  @Get()
  index() {
    console.log(222, this.upService);
    return {
      index: 1,
      upload: this.upService,
    };
  }
}
