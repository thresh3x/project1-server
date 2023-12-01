import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';
import { Photo } from 'src/photo/entities/photo.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private readonly album: Repository<Album>,
    @InjectRepository(Photo) private readonly photo: Repository<Photo>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.album.save(createAlbumDto);
    const { photos } = createAlbumDto;
    for (let i = 0; i < photos.length; i++) {
      await this.photo.save({ url: photos[i].url, album: album });
    }
    return album;
  }

  async findAll(query: { page: number; pageSize: number }) {
    const data = await this.album.find({
      relations: ['photos'],
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
    return this.album.find({
      relations: ['photos'],
      where: {
        id
      }
    });
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const update = await this.album.findOne({where: { id }});
    updateAlbumDto.cover && (update.cover = updateAlbumDto.cover);
    updateAlbumDto.description && (update.description = updateAlbumDto.description);
    updateAlbumDto.name && (update.name = updateAlbumDto.name);
    if (updateAlbumDto.photos.length) {
      const photos = await this.photo.find({
        where: {
          album: update
        }
      });
      photos.length && (photos.forEach(async item => {
        await this.photo.delete(item.id);
      }));
      update.photos && (update.photos.forEach(async item => {
        await this.photo.save({ url: item.url, album: update });
      }));
    }
    await this.album.save(update);
    return {
      affected: 1,
    };
  }

  async remove(id: number) {
    const album = await this.album.findOne({
      relations: ['photos'],
      where: { id }
    });
    const { photos } = album;
    photos.forEach(async item => {
      await this.photo.delete(item.id);
    })
    return this.album.delete(id);
  }
}
