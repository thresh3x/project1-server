import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from './config/config.module';
import { CommentModule } from './comment/comment.module';
import { BackgroundModule } from './background/background.module';
import { MessageModule } from './message/message.module';
import { PhotoModule } from './photo/photo.module';
import { AlbumModule } from './album/album.module';
import { TalkModule } from './talk/talk.module';
import { TalkPhotoModule } from './talk_photo/talk_photo.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/jwt-auth-grard';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: '123456', //密码
      host: 'localhost', //host
      port: 3306, //
      database: 'db', //库名
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库 生产环境不建议用
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    BlogModule,
    ConfigModule,
    CommentModule,
    BackgroundModule,
    MessageModule,
    PhotoModule,
    AlbumModule,
    TalkModule,
    TalkPhotoModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
