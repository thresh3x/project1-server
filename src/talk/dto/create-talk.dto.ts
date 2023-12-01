import { TalkPhoto } from "src/talk_photo/entities/talk_photo.entity";

export class CreateTalkDto {
  user_id: number;
  content: string;
  //说说状态 1 公开 2 私密 3 回收站
  status: number;
  //是否置顶 1 置顶 2 不置顶
  is_top: number;
  likes: number;
  talkImgList: TalkPhoto[];
}
