import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ConfigService } from './config.service';
import { UpdateConfigDto } from './dto/update-config.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('config接口')
@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  findAll() {
    return this.configService.findAll();
  }

  @Patch()
  update(@Param('id') id: string, @Body() updateConfigDto: UpdateConfigDto) {
    return this.configService.update(+id, updateConfigDto);
  }
}
