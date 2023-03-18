import { Module } from '@nestjs/common';
// import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { AuthController } from './auth.controller';
import LocalStrategy from './local.stratege';

@Module({
  // imports: [PassportModule],
  controllers: [AuthController],
  providers: [LocalStrategy],
})
export class AuthModule {}
