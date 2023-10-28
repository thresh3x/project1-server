import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Body } from '@nestjs/common';
import { Tags } from './entities/articleTag.entity';
import { Category } from './entities/articleCategory.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>,
    @InjectRepository(Tags) private readonly tags: Repository<Tags>,
    @InjectRepository(Category) private readonly category: Repository<Category>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    const data = new Article();
    data.title = createBlogDto.title;
    data.categoryId = createBlogDto.categoryId;
    data.content = createBlogDto.content;
    data.isTop = createBlogDto.isTop;
    data.status = createBlogDto.status;
    data.background = createBlogDto.background;
    return this.article.save(data);
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const data = await this.article.find({
      relations: ['tags'], // 绑定关联关系
      where: {
        content: Like(`%${query.keyWord}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });

    const total = await this.article.count({
      where: {
        content: Like(`%${query.keyWord}%`),
      },
    });
    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.article.update(id, updateBlogDto);
  }

  remove(id: number) {
    return this.article.delete(id);
  }

  async addTags(@Body() params: { tags: string[]; articleId: number }) {
    const info = await this.article.findOne({
      where: { id: params.articleId },
    });

    const tagList: Tags[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      const T = new Tags();
      T.tags = params.tags[i];

      await this.tags.save(T);
      tagList.push(T);
    }
    info.tags = tagList;
    return this.article.save(info);
  }

  async findTags(query: { page: number; pageSize: number }) {
    const data = await this.tags.find({
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.tags.count();
    return {
      data,
      total,
    };
  }

  removeTags(id: number) {
    return this.tags.delete(id);
  }

  updateTags(id: number, params: { tags: string }) {
    return this.tags.update(id, params);
  }

  addCate(@Body() params: { name: string }) {
    const data = new Category();
    data.name = params.name;
    return this.category.save(data);
  }

  async findCate(query: { page: number; pageSize: number }) {
    const data = await this.category.find({
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.category.count();
    return {
      data,
      total,
    };
  }

  removeCate(id: number) {
    return this.category.delete(id);
  }

  updateCate(id: number, params: { name: string }) {
    return this.category.update(id, params);
  }
}
