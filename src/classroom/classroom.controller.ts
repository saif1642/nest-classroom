import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TeacherGuard } from '../teacher.guard';
import { ClassRoomService } from './classroom.service';
import { randomBytes } from 'crypto';

@Controller('classroom')
export class ClassRoomController {
  constructor(private classRoomService: ClassRoomService) {}
  @UseGuards(TeacherGuard)
  @Post('create')
  async register(@Body('subject') subject: string) {
    const invitation_code = randomBytes(16).toString('hex');
    return this.classRoomService.save({
      subject,
      is_active: true,
      invitation_code,
    });
  }
}
