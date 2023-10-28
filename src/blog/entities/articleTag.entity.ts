import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  tags: string;
  @ManyToOne(() => Article, (article) => article.tags)
  article: Article;
}
