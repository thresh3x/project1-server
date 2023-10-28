import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MessageTag } from './messageTag.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => MessageTag, (tag) => tag.message)
  @JoinColumn()
  tag: MessageTag;
  @Column()
  content: string;
  @Column({ default: '#676767' })
  color: string;
  @Column({ default: 12 })
  font_size: number;
  @Column({ nullable: true })
  bg_url: string;
  @Column({ nullable: true })
  user_id: number;
  @Column({ default: 0 })
  likes: number;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
