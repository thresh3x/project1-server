import { Module } from '@nestjs/common';
import { TalkPhotoService } from './talk_photo.service';
import { TalkPhotoController } from './talk_photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalkPhoto } from './entities/talk_photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TalkPhoto])],
  controllers: [TalkPhotoController],
  providers: [TalkPhotoService],
})
export class TalkPhotoModule {}
