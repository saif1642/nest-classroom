import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
enum PostType {
  ASSIGNMENT = 'assignment',
  EXAM = 'exam',
}

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PostType,
  })
  type: string;

  @Column()
  description: string;

  @Column({
    type: 'timestamp',
  })
  deadline: Date;

  @Column()
  marks: number;

  @Column()
  classroom_id: number;
}
