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
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('blog接口')
@Controller('blog')
@ApiBearerAuth()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('article')
  @ApiOperation({ summary: '新增article' })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get('article')
  @ApiOperation({ summary: '查询所有article' })
  @ApiQuery({ name: 'page', description: '分页信息' })
  findAll(@Req() req) {
    return this.blogService.findAll(req.query);
  }

  @Get('article/:id')
  @ApiOperation({ summary: '查询article/id' })
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Get('title/exist')
  titleExist(@Req() req) {
    return this.blogService.titleExist(req.query)
  }

  @Patch('article/:id')
  @ApiOperation({ summary: '改article:id' })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete('article/:id')
  @ApiOperation({ summary: '删除article:id' })
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }

  @Post('tags') // 添加tags
  addTag(@Body() params: { name: string }) {
    return this.blogService.addTag(params);
  }

  @Get('tags')
  findTags(@Req() req) {
    return this.blogService.findTags(req.query);
  }

  @Delete('tags')
  removeTags(@Req() req) {
    return this.blogService.removeTags(req);
  }

  @Patch('tags/:id')
  updateTags(@Param('id') id: string, @Body() params: { name: string }) {
    return this.blogService.updateTags(+id, params);
  }

  @Post('category') // 添加category
  addCate(@Body() params: { name: string }) {
    return this.blogService.addCate(params);
  }

  @Get('category')
  @ApiQuery({ name: 'page', description: '分页信息' })
  findCate(@Req() req) {
    return this.blogService.findCate(req.query);
  }

  @Delete('category')
  removeCate(@Req() req) {
    return this.blogService.removeCate(req);
  }

  @Patch('category/:id')
  updateCate(@Param('id') id: string, @Body() params: { name: string }) {
    return this.blogService.updateCate(+id, params);
  }
}
