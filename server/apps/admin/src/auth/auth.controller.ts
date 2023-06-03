import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import RegisterDto from './dto/register.dto';
import LoginDto from './dto/login.dto';
// import { InjectModel } from 'nestjs-typegoose';
// import User from '@libs/db/models/user.module';
// import { ReturnModelType } from '@typegoose/typegoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@libs/mysql/models/user.entity';

import { AuthGuard } from '@nestjs/passport/dist';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userModel: Repository<User>,
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
    return {
      token: this.jwtService.sign({
        username: req.user.username,
        id: req.user._id,
      }),
    };
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @Get('info')
  @UseGuards(AuthGuard('jwt'))
  info(@Req() req: any) {
    return req.user;
  }
}
