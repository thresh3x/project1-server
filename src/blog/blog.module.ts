import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Tags } from './entities/articleTag.entity';
import { Category } from './entities/articleCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tags, Category])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
