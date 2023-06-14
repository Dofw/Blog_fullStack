import { LoginEnum } from '@libs/mysql/models/login.enum';
import { ApiProperty } from '@nestjs/swagger';

export default class RegisterUserDto {
  @ApiProperty({
    description: 'id不需要,默认null',
    required: false,
    example: null,
  })
  id?: null | number;

  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  username: string;

  @ApiProperty({ description: '用户密码', example: '12345678' })
  password: string;

  @ApiProperty({ description: '登录类型', example: 0, enum: LoginEnum })
  loginType: number;
}
