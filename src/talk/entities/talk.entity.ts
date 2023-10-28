import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Talk {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user_id: number;
  @Column()
  content: string;
  @Column() //说说状态 1 公开 2 私密 3 回收站
  status: number;
  @Column({ default: 2 }) //是否置顶 1 置顶 2 不置顶
  is_top: number;
  @Column({ default: 0 })
  likes: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
