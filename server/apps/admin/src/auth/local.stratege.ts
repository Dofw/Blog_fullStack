import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { compareSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUser } from '@libs/mysql/models/loginUser.entity';

import { type IStrategyOptions, Strategy } from 'passport-local';

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

    if (!userInfo)
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);

    if (!compareSync(password, userInfo.password))
      throw new HttpException('密码不正确', HttpStatus.BAD_REQUEST);

    return userInfo;
  }
}
