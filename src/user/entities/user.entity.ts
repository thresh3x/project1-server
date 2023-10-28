import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ default: 2 }) //'用户角色 1 管理员 2 普通用户'
  role: number;
  @Column({ default: '' })
  nick_name: string;
  @Column({ default: '' })
  avatar: string;
  @Column({ default: '' })
  qq: string;
  @Column({ default: '' })
  ip: string;
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;
}
