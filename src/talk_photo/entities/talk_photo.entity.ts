import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TalkPhoto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  talk_id: number;
  @Column()
  url: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
