import { Injectable } from '@nestjs/common';
import { UpdateConfigDto } from './dto/update-config.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './entities/config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config) private readonly config: Repository<Config>,
  ) {}
  findAll() {
    return this.config.find();
  }

  update(id: number, updateConfigDto: UpdateConfigDto) {
    return this.config.update(id, updateConfigDto);
  }
}
