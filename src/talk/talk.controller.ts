import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TalkService } from './talk.service';
import { CreateTalkDto } from './dto/create-talk.dto';
import { UpdateTalkDto } from './dto/update-talk.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('talk接口')
@Controller('talk')
export class TalkController {
  constructor(private readonly talkService: TalkService) {}

  @Post()
  create(@Body() createTalkDto: CreateTalkDto) {
    return this.talkService.create(createTalkDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.talkService.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.talkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTalkDto: UpdateTalkDto) {
    return this.talkService.update(+id, updateTalkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.talkService.remove(+id);
  }
}
