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
    data.status = createPhotoDto.status;
    data.url = createPhotoDto.url;
    data.album = createPhotoDto.album;
    return this.photo.save(data);
  }

  async findAll(query: { album_id: number; page: number; pageSize: number }) {
    return 'all';
  }

  findOne(id: number) {
    const data = this.photo.find({
      where: {
        id: id,
      },
    });
    return data;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return this.photo.update(id, updatePhotoDto);
  }

  remove(id: number) {
    return this.photo.delete(id);
  }
}
