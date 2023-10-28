import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Config {
  @PrimaryColumn({ default: 0 })
  id: number;
  @Column({ default: 'thresh' })
  name: string;
  @Column({ default: 'https://mrzym.gitee.io/blogimg/html/rabbit.png' })
  avatar: string;
  @Column({ nullable: true })
  avatar_bg: string;
  @Column({ nullable: true })
  whats_up: string;
  @Column({ nullable: true })
  qq_link: string;
  @Column({ nullable: true })
  github_link: string;
  @Column({ nullable: true })
  views: number;
}
