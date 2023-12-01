import { Injectable } from '@nestjs/common';
import { CreateTalkPhotoDto } from './dto/create-talk_photo.dto';
import { UpdateTalkPhotoDto } from './dto/update-talk_photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TalkPhoto } from './entities/talk_photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TalkPhotoService {
  constructor(
    @InjectRepository(TalkPhoto)
    private readonly talkPhoto: Repository<TalkPhoto>,
  ) {}

  create(createTalkPhotoDto: CreateTalkPhotoDto) {
    const data = new TalkPhoto();
    data.url = createTalkPhotoDto.url;
    return this.talkPhoto.save(data);
  }

  findAll() {
    return `This action returns all talkPhoto`;
  }

  async findOne(id: number) {
    const data = this.talkPhoto.find({
      where: {
        id: id,
      },
    });
    return data;
  }

  update(id: number, updateTalkPhotoDto: UpdateTalkPhotoDto) {
    return this.talkPhoto.update(id, updateTalkPhotoDto);
  }

  remove(id: number) {
    return this.talkPhoto.delete(id);
  }
}
