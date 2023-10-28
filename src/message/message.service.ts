import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly message: Repository<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    const data = new Message();
    data.content = createMessageDto.content;
    data.color = createMessageDto.color;
    data.font_size = createMessageDto.font_size;
    data.bg_url = createMessageDto.bg_url;
    data.user_id = data.user_id;
    return this.message.save(data);
  }

  async findAll(query: { page: number; pageSize: number }) {
    const data = await this.message.find({
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.message.count();
    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return this.message.find({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return this.message.update(id, updateMessageDto);
  }

  remove(id: number) {
    return this.message.delete(id);
  }
}
