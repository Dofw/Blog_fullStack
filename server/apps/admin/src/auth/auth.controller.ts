import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
import { InjectModel } from 'nestjs-typegoose';
import User from '@libs/db/models/user.module';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport/dist';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  @ApiOperation({ summary: '注册' })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { username, password } = dto;

    // 是否存在

    const userInfo = await this.userModel.create({
      username,
      password, //mongo set bcrypt
    });
    return userInfo;
  }

  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() dto: LoginDto, @Req() req: any) {
    return req.user;
  }

  @Get('info')
  info() {
    return '信息';
  }
}
