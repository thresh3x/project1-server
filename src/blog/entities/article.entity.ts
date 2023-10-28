import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Tags } from './articleTag.entity';
import { Category } from './articleCategory.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;
  @Generated('uuid')
  uuid: string;
  @Column()
  title: string;
  @OneToOne(() => Category, (category) => category.article)
  @JoinColumn()
  categoryId: number;
  @Column()
  content: string;
  @Column({ nullable: true })
  background: string;
  @Column({ default: 2 })
  isTop: number;
  @Column({ default: 1 })
  status: number;
  @Column({ default: 0 })
  views: number;
  @Column({ default: 0 })
  likes: number;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  updateAt: Date;
  @OneToMany(() => Tags, (tag) => tag.article)
  @JoinColumn()
  tags: Tags[];
}
