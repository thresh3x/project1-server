import { Photo } from "src/photo/entities/photo.entity";

export class CreateAlbumDto {
  name: string;
  description: string;
  // 封面
  cover: string;
  photos: Photo[];
}
