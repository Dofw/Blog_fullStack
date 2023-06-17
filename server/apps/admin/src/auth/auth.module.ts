import { User } from '@libs/mysql/models/user.entity';
import { LoginUser } from '@libs/mysql/models/loginUser.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import LocalStrategy from './local.stratege';
import JwtStategy from './jwt.stratege';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User, LoginUser])],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStategy, AuthService], //可以理解为, 第一次admin中注册后,剩余的交给 AuthGuard('name')
})
export class AuthModule {}
