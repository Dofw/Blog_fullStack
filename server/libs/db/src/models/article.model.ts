import { ApiProperty } from '@nestjs/swagger';
import { modelOptions, prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export default class Article {
  @ApiProperty({ description: '标题', example: 'nestjs' })
  @prop()
  title: string;

  @ApiProperty({ description: '标签', example: 'mongodb' })
  @prop()
  tag: string;

  @ApiProperty({ description: '摘要', example: 'nestjs is Nodejs framework!' })
  @prop()
  digest: string;

  @ApiProperty({ description: '封面url', example: 'nestjs.com' })
  @prop()
  imgUrl: string;

  @ApiProperty({ description: '内容', example: 'nestjs很强...' })
  @prop()
  content: string;
}
