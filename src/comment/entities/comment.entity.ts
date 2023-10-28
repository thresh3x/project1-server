import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  parent_id: number;
  @Column()
  for_id: number;
  @Column({ nullable: true })
  type: number;
  @Column({ nullable: true })
  from_id: number;
  @Column({ nullable: true })
  from_name: string;
  @Column({ nullable: true })
  from_avatar: string;
  @Column({ nullable: true })
  to_id: number;
  @Column({ nullable: true })
  to_name: string;
  @Column({ nullable: true })
  to_avatar: string;
  @Column()
  content: string;
  @Column({ default: 0 })
  likes: number;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @Column({ default: '未知' })
  ip: string;
}
