import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { AuthController } from './auth.controller';
import LocalStrategy from './local.stratege';
import JwtStategy from './jwt.stratege';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStategy], //可以理解为, 第一次admin中注册后,剩余的交给 AuthGuard('name')
})
export class AuthModule {}
