import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
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

@Controller('classroom')
export class ClassRoomController {
  constructor(
    private classRoomService: ClassRoomService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
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
}
