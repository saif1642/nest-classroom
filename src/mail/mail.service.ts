import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendTeacherConfirmation(password: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome here is your login password',
      text: `Your login password is ${password} and email is ${email}`,
    });
  }

  async sendStudentNotification(message: string, email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Classroom Notification',
      text: message,
    });
  }
}
