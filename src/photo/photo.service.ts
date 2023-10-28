import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private readonly photo: Repository<Photo>,
  ) {}

  create(createPhotoDto: CreatePhotoDto) {
    const data = new Photo();
    data.ablum_id = createPhotoDto.ablum_id;
    data.status = createPhotoDto.status;
    data.url = createPhotoDto.url;
    return this.photo.save(data);
  }

  async findAll(query: { album_id: number; page: number; pageSize: number }) {
    const data = await this.photo.find({
      where: {
        ablum_id: query.album_id,
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.photo.count({
      where: {
        ablum_id: query.album_id,
      },
    });
    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return this.photo.update(id, updatePhotoDto);
  }

  remove(id: number) {
    return this.photo.delete(id);
  }
}
