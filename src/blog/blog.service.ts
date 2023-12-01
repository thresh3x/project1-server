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
    return this.article.save(createBlogDto); // return Article
  }

  async findAll(query: { keyWord: string; page: number; pageSize: number }) {
    const data = await this.article.find({
      relations: ['tags', 'category'], // 绑定关联关系
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
    return this.article.findOne({
      relations: ['tags', 'category'],
      where: {
        id
      }
    });
  }

  async titleExist(query: {id: number; title: string}) {
    const one: Article[] = await this.article.find({
      where: {
        title: query.title
      }
    })
    if (one.length) {
      return {
        result: 'title exit'
      }
    }
    return {
      code: 200
    }
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const update = await this.article.findOne({where: {id}})
    updateBlogDto.author_id && (update.author_id = updateBlogDto.author_id);
    updateBlogDto.category && (update.category = updateBlogDto.category);
    updateBlogDto.content && (update.content = updateBlogDto.content);
    updateBlogDto.cover && (update.cover = updateBlogDto.cover);
    updateBlogDto.description && (update.description = updateBlogDto.description);
    updateBlogDto.isTop && (update.isTop = updateBlogDto.isTop);
    updateBlogDto.status && (update.status = updateBlogDto.status);
    updateBlogDto.tags && (update.tags = updateBlogDto.tags);
    updateBlogDto.title && (update.title = updateBlogDto.title);
    await this.article.save(update);
    return {
      affected: 1
    }
  }

  remove(id: number) {
    return this.article.delete(id);
  }

  async addTag(@Body() params: { name:string }) {
    // const info = await this.article.findOne({
    //   where: { id: params.articleId },
    // });

    // const tagList: Tags[] = [];
    // for (let i = 0; i < params.tags.length; i++) {
    //   const T = new Tags();
    //   T.name = params.tags[i];

    //   await this.tags.save(T);
    //   tagList.push(T);
    // }
    // info.tags = tagList;
    return this.tags.save({name: params.name});
  }

  async findTags(query: { keyWord: string ,page: number; pageSize: number }) {
    const data = await this.tags.find({
      where: {
        name: Like(`%${query.keyWord}%`)
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

  removeTags(query: any) {
    query.query.idList.forEach(id => {
      this.tags.delete(+id)
    })
    return {
      code: 200,
      message: 'delete tags success'
    };
  }

  updateTags(id: number, @Body() params: { name: string }) {
    console.log(params);
    
    return this.tags.update(id, {name: params.name});
  }

  addCate(@Body() params: { name: string }) {
    const data = new Category();
    data.name = params.name;
    return this.category.save(data);
  }

  async findCate(query: { keyWord: string, page: number , pageSize: number }) {
    const data = await this.category.find({
      where: {
        name: Like(`%${query.keyWord}%`)
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

  removeCate(query: any) {
    query.query.idList.forEach(id => {
      this.category.delete(+id)
    })
    return {
      code: 200,
      message: 'delete tags success'
    };
  }

  updateCate(id: number, @Body() params: { name: string }) {
    return this.category.update(id, params);
  }
}
