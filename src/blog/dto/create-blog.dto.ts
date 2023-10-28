import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ example: 'title' })
  title: string;
  @ApiProperty()
  categoryId: number;
  @ApiProperty()
  content: string;
  @ApiProperty({ nullable: true })
  background: string;
  @ApiProperty({ default: 2 })
  isTop: number;
  @ApiProperty({ default: 1 })
  status: number;
}
