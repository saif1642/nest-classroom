import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('classroom')
export class Classroom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column({
    default: false,
  })
  is_active: boolean;

  @Column()
  invitation_code: string;

  @Column()
  teacher_id: number;
}
