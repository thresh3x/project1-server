import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: '评论父级id' })
  parent_id: number;
  @ApiProperty({ description: '评论的对象id' })
  for_id: number;
  @ApiProperty({ description: '评论类型' })
  type: number;
  @ApiProperty({ description: '评论人id' })
  from_id: number;
  @ApiProperty({ description: '评论人昵称' })
  from_name: string;
  @ApiProperty({ description: '评论人头像' })
  from_avatar: string;
  @ApiProperty({ description: '被回复的人id' })
  to_id: number;
  @ApiProperty({ description: '被回复人的昵称' })
  to_name: string;
  @ApiProperty({ description: '被回复人的头像' })
  to_avatar: string;
  @ApiProperty({ description: '评论内容' })
  content: string;
  @ApiProperty({ description: 'ip地址' })
  ip: string;
}
