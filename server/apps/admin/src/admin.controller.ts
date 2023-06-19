import { InjectRepository } from '@nestjs/typeorm';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { LoginUser } from '@libs/mysql/models/loginUser.entity';
import { Repository } from 'typeorm';

@ApiTags('默认')
@Controller()
export class AdminController {
  constructor(
    @InjectRepository(LoginUser)
    private loginUser: Repository<LoginUser>,
  ) {}

  @ApiOperation({ summary: '初始' })
  @ApiBearerAuth()
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async index() {
    const result = await this.loginUser.find();
    console.log(result);
    return 'admin-controller-index';
  }
}
