import { ApiProperty } from '@nestjs/swagger';

export class DeleteDto {
  @ApiProperty({
    description: '删除参数：单个删除、多个删除',
    required: true,
    example: '1 or [1,2]',
  })
  ids: number | number[];
}
