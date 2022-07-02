import { Controller, Get } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';
import { ClassRoomService } from './classroom/classroom.service';
import { MailService } from './mail/mail.service';
import { PostService } from './post/post.service';
import { UserType } from './user/user';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private postService: PostService,
    private classroomService: ClassRoomService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async runEveryHour() {
    const posts = await this.postService.find();
    let classroom = await this.classroomService.find({ is_active: true });
    classroom = classroom.map((item) => item.id);

    posts.forEach(async (item) => {
      const currentDate = new Date();
      const deadline = new Date(item.deadline);
      const timeDiffInHour = this.diff_hours(deadline, currentDate);
      if (timeDiffInHour <= 1) {
        if (classroom.includes(item.student_id)) {
          const student = await this.userService.findOne({
            id: item.student_id,
            user_type: UserType.STUDENT,
          });
          if (student) {
            await this.mailService.sendStudentNotification(
              'You have an upcoming event in classroom',
              student.email,
            );
          }
        }
      }
    });
  }

  diff_hours(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  }
}
