import { MessageTag } from '../entities/messageTag.entity';

export class CreateMessageDto {
  tag: MessageTag;
  content: string;
  color: string;
  font_size: number;
  bg_url: string;
  user_id: number;
}
