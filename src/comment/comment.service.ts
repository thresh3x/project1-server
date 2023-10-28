import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const data = new Comment();
    data.content = createCommentDto.content;
    data.parent_id = createCommentDto.parent_id;
    data.for_id = createCommentDto.for_id;
    data.type = createCommentDto.type;
    data.from_id = createCommentDto.from_id;
    data.from_name = createCommentDto.from_name;
    data.from_avatar = createCommentDto.from_avatar;
    data.to_id = createCommentDto.to_id;
    data.to_name = createCommentDto.to_name;
    data.to_avatar = createCommentDto.to_avatar;
    data.ip = createCommentDto.ip;
    return this.comment.save(data);
  }

  async findAll(query: {
    for_id: number;
    type: number;
    page: number;
    pageSize: number;
  }) {
    const data = await this.comment.find({
      where: {
        for_id: query.for_id,
        type: query.type,
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.comment.count({
      where: {
        for_id: query.for_id,
        type: query.type,
      },
    });
    return {
      data,
      total,
    };
  }

  remove(id: number) {
    return this.comment.delete(id);
  }
}
