import { PartialType } from '@nestjs/swagger';
import { CreateTalkPhotoDto } from './create-talk_photo.dto';

export class UpdateTalkPhotoDto extends PartialType(CreateTalkPhotoDto) {}
