import { Injectable } from '@nestjs/common';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';
import { Repository } from 'typeorm';

@ApiTags('talk接口')
@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk) private readonly talk: Repository<Talk>,
  ) {}

  create(createTalkDto: CreateTalkDto) {
    const data = new Talk();
    data.content = createTalkDto.content;
    data.is_top = createTalkDto.is_top;
    data.status = createTalkDto.status;
    data.user_id = createTalkDto.user_id;
    return this.talk.save(data);
  }

  async findAll(query: { page: number; pageSize: number }) {
    const data = await this.talk.find({
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.talk.count();
    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} talk`;
  }

  update(id: number, updateTalkDto: UpdateTalkDto) {
    return this.talk.update(id, updateTalkDto);
  }

  remove(id: number) {
    return this.talk.delete(id);
  }
}
