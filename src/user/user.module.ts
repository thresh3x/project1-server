import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { jwtConstants } from './token-constants';
import { JwtModule } from '@nestjs/jwt';
import JwtAuthStrategy from 'src/common/jwt-auth.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthStrategy],
})
export class UserModule {}
