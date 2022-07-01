import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('postresult')
export class PostResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  result: number;

  @Column()
  post_id: number;

  @Column()
  student_id: number;
}
