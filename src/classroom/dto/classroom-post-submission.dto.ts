import { IsNotEmpty } from 'class-validator';

export class ClassroomPostSubmissionDTO {
  @IsNotEmpty()
  post_id: number;

  @IsNotEmpty()
  student_id: number;

  @IsNotEmpty()
  submission_doc_url: string;
}
