import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('默认')
@Controller()
export class AdminController {
  @ApiOperation({ summary: '初始' })
  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard('jwt'))
  index(): string {
    return 'admin-controller-index';
  }
}
