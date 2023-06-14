import { LoginEnum } from '@libs/mysql/models/login.enum';
import { ApiProperty } from '@nestjs/swagger';

export default class RegisterPhoneDto {
  @ApiProperty({
    description: 'id不需要,默认null',
    required: false,
  })
  id: null | number;

  @ApiProperty({ description: '手机模式-手机号', example: '189xxxxxxxx' })
  phone: string;

  @ApiProperty({ description: '登录类型', example: 0, enum: LoginEnum })
  loginType: number;
}
