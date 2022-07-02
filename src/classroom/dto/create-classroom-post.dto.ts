import { IsNotEmpty } from 'class-validator';

export class CreateClassroomPostDTO {
  @IsNotEmpty()
  classroom_id: number;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  deadline: Date;

  @IsNotEmpty()
  marks: number;
}
