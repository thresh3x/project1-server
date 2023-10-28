import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TalkPhotoService } from './talk_photo.service';
import { CreateTalkPhotoDto } from './dto/create-talk_photo.dto';
import { UpdateTalkPhotoDto } from './dto/update-talk_photo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('talk_photo接口')
@Controller('talk-photo')
export class TalkPhotoController {
  constructor(private readonly talkPhotoService: TalkPhotoService) {}

  @Post()
  create(@Body() createTalkPhotoDto: CreateTalkPhotoDto) {
    return this.talkPhotoService.create(createTalkPhotoDto);
  }

  @Get()
  findAll() {
    return this.talkPhotoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talkPhotoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTalkPhotoDto: UpdateTalkPhotoDto,
  ) {
    return this.talkPhotoService.update(+id, updateTalkPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talkPhotoService.remove(+id);
  }
}
