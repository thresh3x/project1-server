import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Public } from 'src/common/public.decorator';

@ApiTags('user接口')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('code') // 获取验证码图片
  @ApiOperation({ summary: '获取验证码图片', description: '获取验证码图片' })
  createCaptcha(@Req() req, @Res() res) {
    this.userService.createCaptcha(req, res);
  }

  @Public()
  @Post('signin') // 注册
  createUser(@Req() req, @Body() createUserDto: CreateUserDto) {
    return this.userService.signup(req, createUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.userService.login(createUserDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ name: 'page', description: '分页信息' })
  @ApiResponse({ status: 403, description: '我是403' })
  findAll(@Req() req) {
    return this.userService.findAll(req.query);
  }

  @Get('role')
  findByRole(@Req() req) {
    return this.userService.findByRole(req.query);
  }

  @Public()
  @Get('/one')
  @ApiParam({ name: 'keyword', required: true })
  findOne(@Req() req) {
    return this.userService.findOne(req.query);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
