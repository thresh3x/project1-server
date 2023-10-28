import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { MessageTag } from './entities/messageTag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, MessageTag])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
