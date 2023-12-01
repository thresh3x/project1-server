import { Injectable } from '@nestjs/common';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';
import { Repository } from 'typeorm';
import { TalkPhoto } from 'src/talk_photo/entities/talk_photo.entity';

@ApiTags('talk接口')
@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk) private readonly talk: Repository<Talk>,
    @InjectRepository(TalkPhoto) private readonly talkPhoto: Repository<TalkPhoto>,
  ) { }

  async create(createTalkDto: CreateTalkDto) {
    const talk = await this.talk.save(createTalkDto);
    const { talkImgList } = createTalkDto;
    for (let i = 0; i < talkImgList.length; i++) {
      await this.talkPhoto.save({ url: talkImgList[i].url, talk: talk });
    }
    return talk
  }

  async findAll(query: { page: number; pageSize: number }) {
    const data = await this.talk.find({
      relations: ['talkImgList'],
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
    return this.talk.findOne({
      relations: ['talkImgList'],
      where: {
        id
      }
    });
  }

  async update(id: number, updateTalkDto: UpdateTalkDto) {
    const update = await this.talk.findOne({ where: { id } });
    updateTalkDto.content && (update.content = updateTalkDto.content);
    updateTalkDto.is_top && (update.is_top = updateTalkDto.is_top);
    updateTalkDto.likes && (update.likes = updateTalkDto.likes);
    updateTalkDto.status && (update.status = updateTalkDto.status);
    if (updateTalkDto.talkImgList) {
      const photos = await this.talkPhoto.find({
        where: {
          talk: update
        }
      })
      photos.forEach(async item => {
        await this.talkPhoto.delete(item.id)
      })
      update.talkImgList.forEach(async item => {
        await this.talkPhoto.save({ url: item.url, talk: update })
      });
    }
    updateTalkDto.user_id && (update.user_id = updateTalkDto.user_id);
    await this.talk.save(update);
    return {
      affected: 1,
    }
  }

  async remove(id: number) {
    const talk = await this.talk.findOne({relations: ['talkImgList'] ,where: {id}})
     
    const { talkImgList } = talk
    talkImgList.forEach(async item => {
      await this.talkPhoto.delete(item.id)
    })
    return this.talk.delete(id);
  }
}
