import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
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
  @Column()
  author_id: number;
  @Column()
  content: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  cover: string;
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
  @ManyToMany(() => Tags)
  @JoinTable()
  tags: Tags[];
  @ManyToOne(() => Category, (category) => category.article)
  category: Category;
}
