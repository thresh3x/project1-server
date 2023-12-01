import { Album } from "src/album/entities/album.entity";

export class CreatePhotoDto {
  url: string;
  // 1 正常 2 回收站
  status: number;
  album: Album;
}
