import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private readonly album: Repository<Album>,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const data = new Album();
    data.cover = createAlbumDto.cover;
    data.description = createAlbumDto.description;
    data.name = createAlbumDto.name;
    return this.album.save(data);
  }

  async findAll(query: { page: number; pageSize: number }) {
    const data = await this.album.find({
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.album.count();
    return {
      data,
      total,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} album`;
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return this.album.update(id, updateAlbumDto);
  }

  remove(id: number) {
    return this.album.delete(id);
  }
}
