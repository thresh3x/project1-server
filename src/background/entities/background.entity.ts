import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Background {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  bg_url: string;
  @Column()
  route_name: string;
}
