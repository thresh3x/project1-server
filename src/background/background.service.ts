import { Injectable } from '@nestjs/common';
import { CreateBackgroundDto } from './dto/create-background.dto';
import { UpdateBackgroundDto } from './dto/update-background.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Background } from './entities/background.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BackgroundService {
  constructor(
    @InjectRepository(Background)
    private readonly background: Repository<Background>,
  ) {}
  create(createBackgroundDto: CreateBackgroundDto) {
    const data = new Background();
    data.bg_url = createBackgroundDto.bg_url;
    data.route_name = createBackgroundDto.route_name;
    return this.background.save(data);
  }

  findAll() {
    return this.background.find();
  }

  findOne(id: number) {
    return this.background.find({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateBackgroundDto: UpdateBackgroundDto) {
    return this.background.update(id, updateBackgroundDto);
  }

  remove(id: number) {
    return this.background.delete(id);
  }
}
