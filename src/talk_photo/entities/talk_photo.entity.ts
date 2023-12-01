import { Talk } from 'src/talk/entities/talk.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TalkPhoto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @ManyToOne(() => Talk, (talk) => talk.talkImgList)
  talk: Talk;
}
