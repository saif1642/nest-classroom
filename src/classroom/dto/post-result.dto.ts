import { IsNotEmpty } from 'class-validator';

export class PostResultDTO {
  @IsNotEmpty()
  post_id: number;

  @IsNotEmpty()
  student_id: number;

  @IsNotEmpty()
  result: number;
}
