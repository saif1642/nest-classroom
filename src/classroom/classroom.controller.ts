import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TeacherGuard } from '../teacher.guard';
import { ClassRoomService } from './classroom.service';
import { randomBytes } from 'crypto';
import { UserService } from 'src/user/user.service';
import { StudentClassroomSubscribeDTO } from './dto/student-subscribe.dto';
import { StudentGuard } from 'src/student.guard';
import { SubscriptionService } from '../subscription/subscription.service';
import { CreateClassroomPostDTO } from './dto/create-classroom-post.dto';
import { PostService } from '../post/post.service';
import { ClassroomPostSubmissionDTO } from './dto/classroom-post-submission.dto';
import { PostSubmissionService } from '../post-submission/post-submission.service';
import { PostResultDTO } from './dto/post-result.dto';
import { PostResultService } from '../post-result/post-result.service';

@Controller('classroom')
export class ClassRoomController {
  constructor(
    private classRoomService: ClassRoomService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private postService: PostService,
    private postSubmissionService: PostSubmissionService,
    private postResultService: PostResultService,
  ) {}
  @UseGuards(TeacherGuard)
  @Post('create')
  async register(
    @Body('subject') subject: string,
    @Body('teacher_id') teacher_id: number,
  ) {
    const invitation_code = randomBytes(16).toString('hex');
    return this.classRoomService.save({
      subject,
      is_active: true,
      invitation_code,
      teacher_id,
    });
  }

  @UseGuards(TeacherGuard)
  @Post('teacher/classroom/end')
  async endClassroom(@Body('classroom_id') classroom_id: number) {
    const classroom = await this.classRoomService.findOne({
      id: classroom_id,
      is_active: true,
    });
    if (!classroom) {
      throw new NotFoundException('Active Classroom not found');
    }
    await this.classRoomService.update(classroom_id, { is_active: false });

    return {
      message: 'Classroom Ended Successfully',
    };
  }

  @UseGuards(TeacherGuard)
  @Post('teacher/post/create')
  async createClassroomPost(
    @Body() createClassroomPostDTO: CreateClassroomPostDTO,
  ) {
    return this.postService.save(createClassroomPostDTO);
  }

  @UseGuards(TeacherGuard)
  @Post('teacher/post/result')
  async submitPostResult(@Body() postResultDTO: PostResultDTO) {
    return this.postResultService.save(postResultDTO);
  }

  @UseGuards(StudentGuard)
  @Post('student/subscribe')
  async studentSubscribe(@Body() body: StudentClassroomSubscribeDTO) {
    const { student_id, classroom_code } = body;
    const classroom = await this.classRoomService.findOne({
      invitaion_code: classroom_code,
      is_active: true,
    });

    if (!classroom) {
      throw new NotFoundException('Active Classroom Not Found!');
    }

    const student = await this.userService.findOne({ id: student_id });
    if (!student) {
      throw new NotFoundException('Student Not Found!');
    }

    const subscription = await this.subscriptionService.save({
      student_id: student.id,
      classroom_id: classroom.id,
    });

    if (!subscription) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return {
      message: 'Classrooom Subscription successful',
      subscription,
    };
  }

  @UseGuards(StudentGuard)
  @Post('student/post/submission')
  async classroomPostSubmission(
    @Body() classroomPostSubmissionDTO: ClassroomPostSubmissionDTO,
  ) {
    return this.postSubmissionService.save(classroomPostSubmissionDTO);
  }

  @UseGuards(StudentGuard)
  @Get('student/upcoming/work/:classroom_id')
  async getUpcomingClassroomEvent(@Param('classroom_id') classroom_id: number) {
    return this.postService.find(classroom_id);
  }

  @UseGuards(StudentGuard)
  @Get('student/result/:student_id')
  async getStudentResult(@Param('student_id') student_id: number) {
    return this.postResultService.find(student_id);
  }
}
