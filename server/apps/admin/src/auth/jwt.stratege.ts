import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoginUser } from '@libs/mysql/models/loginUser.entity';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export default class JwtStategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(LoginUser)
    private readonly userInfoModel: Repository<LoginUser>,
    private reflector: Reflector,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);
  }

  async validate(tokenInfo: any): Promise<any> {
    try {
      return await this.userInfoModel.findOne({
        select: ['username', 'password', 'id'],
        where: { id: tokenInfo.id },
      });
    } catch (error) {
      throw new HttpException('token 无效!', HttpStatus.FORBIDDEN);
    }
  }
}
