import { ApiProperty } from '@nestjs/swagger';

export default class LoginDto {
  @ApiProperty({ description: '用户名', example: 'admin' })
  username: string;

  @ApiProperty({ description: '用户密码', example: '12345678' })
  password: string;
}
