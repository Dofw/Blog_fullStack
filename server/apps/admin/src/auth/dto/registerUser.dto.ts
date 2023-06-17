import { ApiProperty } from '@nestjs/swagger';

export default class RegisterUserDto {
  @ApiProperty({
    description: 'uuid生成, 默认null',
    required: false,
    example: null,
  })
  id?: string | null;

  @ApiProperty({
    description: '用户名',
    example: 'admin',
  })
  username: string;

  @ApiProperty({ description: '用户密码', example: '12345678' })
  password: string;
}
