import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import RegisterPhoneDto from './dto/registerPhone.dto';
import RegisterUserDto from './dto/registerUser.dto';
import LoginDto from './dto/login.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Login } from '@libs/mysql/models/login.entity';

import { AuthGuard } from '@nestjs/passport/dist';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Login)
    private readonly loginModel: Repository<Login>,
  ) {}

  @ApiOperation({ summary: '用户名注册' })
  @Post('register/user')
  async registerUser(@Body() dto: RegisterUserDto) {
    const { username, password, loginType } = dto;
    console.log('用户登录', dto);

    const otherInfo = {
      ip: '',
      address: '',
      equipmentInfo: '',
    };

    const option: RegisterUserDto = {
      username,
      password,
      loginType: +loginType,
      ...otherInfo,
    };
    // 是否存在
    const loginInfo = await this.loginModel.save(option);
    return loginInfo;
  }

  @ApiOperation({ summary: '手机注册' })
  @Post('register/phone')
  async registerPhone(@Body() dto: RegisterPhoneDto) {
    const { phone, loginType } = dto;

    const otherInfo = {
      ip: '',
      address: '',
      equipment: '',
    };

    const option: RegisterPhoneDto = {
      id: null,
      phone,
      loginType,
      ...otherInfo,
    };

    // 是否存在
    const loginInfo = await this.loginModel.create(option);
    return loginInfo;
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
