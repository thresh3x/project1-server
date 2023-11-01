import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';
// import { ResponseChange } from './common/response';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// 白名单，还可以做鉴权
// const whiteList = [''];
function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  // if (whiteList.includes(req.originalUrl)) {
  next();
  // } else {
  // res.send('没有权限');
  // }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('thresh接口文档')
    .setDescription('blog接口文档')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-docs', app, document); // 接口文档

  app
    .use(cors()) // 跨域
    .use(MiddleWareAll)
    .use(
      session({
        secret: 'thresh',
        rolling: true,
        name: 'thresh.id',
        cookie: { maxAge: 9999},
      }),
    );
  // app.useGlobalInterceptors(new ResponseChange());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
