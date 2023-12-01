import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../entities/articleCategory.entity';
import { Tags } from '../entities/articleTag.entity';

export class CreateBlogDto {
  @ApiProperty({ example: 'title' })
  title: string;
  @ApiProperty()
  category: Category;
  @ApiProperty()
  tags: Tags[];
  @ApiProperty()
  content: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ nullable: true })
  cover: string;
  @ApiProperty({ default: 2 })
  isTop: number;
  @ApiProperty()
  author_id: number;
  @ApiProperty({ default: 1 })
  status: number;
}
