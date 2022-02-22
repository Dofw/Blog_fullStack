import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('默认')
@Controller()
export class AdminController {
  @ApiOperation({ summary: '初始' })
  @Get()
  index(): string {
    return 'hellow!';
  }
}
