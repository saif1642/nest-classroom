import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('postsubmission')
export class PostSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  submission_doc_url: string;

  @Column()
  post_id: number;

  @Column()
  student_id: number;
}
