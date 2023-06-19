import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import RegisterPhoneDto from './dto/registerPhone.dto';
import RegisterUserDto from './dto/registerUser.dto';
import LoginDto from './dto/loginUser.dto';

import { AuthGuard } from '@nestjs/passport/dist';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginUser } from '@libs/mysql/models/loginUser.entity';
import { DeleteDto } from './dto/delete.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'user注册' })
  @Post('user/create')
  async registerUser(@Body() dto: RegisterUserDto) {
    const { id, ...restData } = dto;
    // 从res中获取 ip info
    const otherInfo = {
      ip: '',
      address: '',
      equipmentInfo: { type: 'PC端' },
    };
    const data: LoginUser | Omit<LoginUser, 'id' | 'deleteAt'> = {
      ...restData,
      ...otherInfo,
    };
    return await this.authService.uSave(data);
  }

  @ApiOperation({
    summary: 'user获取',
  })
  @Get('user/get')
  async registerUserGet() {
    return await this.authService.uGet();
  }

  @ApiOperation({
    summary: 'user删除',
  })
  @Post('user/delete')
  async registerUserDel(@Body() body: DeleteDto) {
    return await this.authService.uDelete(body.ids);
  }

  @ApiOperation({ summary: 'user登录' })
  @UseGuards(AuthGuard('local'))
  @Post('user/login')
  async login(@Body() dto: LoginDto, @Req() req: any) {
    console.log(111, req.user);

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
