import { Injectable, BadRequestException, Session } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Req, Res, Body } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcryptjs';
let code:string
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 创建验证码
  createCaptcha(@Req() req, @Res() res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    req.session.code = captcha.text; //存储验证码记录到session
    code = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  // 注册
  async signup(@Req() req, @Body() createUserDto: CreateUserDto) {
    const regInfo = req.body;
    
    //验证码
    if (
      !(
        code?.toLocaleLowerCase() === regInfo.code.toLocaleLowerCase()
      )
    ) {
      return {
        status: 3,
        message: '验证码错误',
      };
    }
  
    if (!regInfo.username || !regInfo.password) {
      return {
        status: 1,
        message: '账号或密码不为空',
      };
    }

    const exit = await this.user.findOne({
      where: {
        username: regInfo.username,
      },
    });

    if (exit && exit.username === createUserDto.username) {
      return {
        status: 2,
        message: '账号已存在',
      };
    }

    createUserDto.password = bcrypt.hashSync(
      createUserDto.password,
      bcrypt.genSaltSync(10),
    );

    await this.user.save(createUserDto);

    return {
      status: 0,
      message: '成功创建',
    };
  }

  async login(createUserDto: CreateUserDto) {
    const exit = await this.user.findOne({
      where: { username: createUserDto.username },
    });

    if (!exit) return new BadRequestException('用户不存在');

    const compareRes: boolean = bcrypt.compareSync(
      createUserDto.password,
      exit.password,
    );
    if (!compareRes) return new BadRequestException('密码不正确');
    const payload = { username: exit.username, role: exit.role };

    return {
      token: this.jwtService.sign(payload),
      message: '登陆成功',
    };
  }

  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.avatar = createUserDto.avatar;
    data.ip = createUserDto.ip;
    data.nick_name = createUserDto.nick_name;
    data.password = createUserDto.password;
    data.username = createUserDto.username;
    data.qq = createUserDto.qq;
    data.role = createUserDto.role;
    return this.user.save(data);
  }

  async findAll(query: { page: number; pageSize: number;}) {
    const data = await this.user.find({
      order: {
        // id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.user.count();
    return {
      data,
      total,
    };
  }

  async findByRole(query: {page: number; pageSize: number; keyWord: string; role: number}) {
    const data = await this.user.find({
      where : {
        nick_name: ILike(`%${query.keyWord}%`),
        role: query.role && +query.role
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    })
    const total = await this.user.count({
      where: {
        nick_name: ILike(`%${query.keyWord}%`),
        role: query.role
      }
    });
    return {
      data,
      total,
    };
  }

  findOne(query: {keyword: string}) {
    return this.user.findOne({
      where: {
        username: query.keyword
      }
    });
  }
  
  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const old = await this.findOne({keyword: updateUserDto.username})
      const compareRes: boolean = bcrypt.compareSync(
        updateUserDto.oldPassword,
        old.password,
      );
      if (!compareRes) {
        return {
          status: 2,
          message: 'Old password is wrong'
        }
      }
      updateUserDto.password = bcrypt.hashSync(
        updateUserDto.password,
        bcrypt.genSaltSync(10),
      )
      delete updateUserDto.oldPassword
    }
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
