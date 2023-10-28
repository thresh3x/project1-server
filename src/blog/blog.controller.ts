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
  addTags(@Body() params: { tags: string[]; articleId: number }) {
    return this.blogService.addTags(params);
  }

  @Get('tags')
  @ApiQuery({ name: 'page', description: '分页信息' })
  findTags(@Req() req) {
    this.blogService.findTags(req.query);
  }

  @Delete('tags:id')
  removeTags(@Param('id') id: string) {
    return this.blogService.removeTags(+id);
  }

  @Patch('tags:id')
  updateTags(@Param('id') id: string, params: { tags: string }) {
    return this.blogService.updateTags(+id, params);
  }

  @Post('category') // 添加category
  addCate(@Body() params: { name: string }) {
    return this.blogService.addCate(params);
  }

  @Get('category')
  @ApiQuery({ name: 'page', description: '分页信息' })
  findCate(@Req() req) {
    this.blogService.findCate(req.query);
  }

  @Delete('category:id')
  removeCate(@Param('id') id: string) {
    return this.blogService.removeCate(+id);
  }

  @Patch('tags:id')
  updateCate(@Param('id') id: string, params: { name: string }) {
    return this.blogService.updateCate(+id, params);
  }
}
