import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { compareSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUser } from '@libs/mysql/models/loginUser.entity';

import { IStrategyOptions, Strategy } from 'passport-local';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(LoginUser)
    private readonly userInfoModel: Repository<LoginUser>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string): Promise<any> {
    const userInfo = await this.userInfoModel.findOne({
      select: ['username', 'password', 'id'],
      where: { username },
    });

    if (!userInfo) throw new BadRequestException('用户不存在');

    if (!compareSync(password, userInfo.password))
      throw new BadRequestException('密码不正确');

    return userInfo;
  }
}
