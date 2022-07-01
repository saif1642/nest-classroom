import { IsNotEmpty } from 'class-validator';

export class StudentClassroomSubscribeDTO {
  @IsNotEmpty()
  student_id: number;

  @IsNotEmpty()
  classroom_code: string;
}
