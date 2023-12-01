import { Module } from '@nestjs/common';
import { TalkService } from './talk.service';
import { TalkController } from './talk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Talk } from './entities/talk.entity';
import { TalkPhoto } from 'src/talk_photo/entities/talk_photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Talk, TalkPhoto])],
  controllers: [TalkController],
  providers: [TalkService],
})
export class TalkModule {}
