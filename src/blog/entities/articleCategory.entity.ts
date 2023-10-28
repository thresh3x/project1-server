import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Article } from './article.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToOne(() => Article, (article) => article.categoryId)
  article: Article;
}
