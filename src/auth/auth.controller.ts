import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { MailService } from '../mail/mail.service';
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  @Post('admin/register')
  async register(@Body() body: RegisterDTO) {
    const { password_confirm, ...data } = body;

    if (body.password !== password_confirm) {
      throw new BadRequestException('Password do not match !');
    }

    const hashed = await bcrypt.hash(body.password, 12);

    return this.userService.save({
      ...data,
      password: hashed,
      user_type: 'admin',
    });
  }

  @Post('admin/teacher/create')
  async createNewTeacher(@Body() body: RegisterDTO) {

    
    const { password_confirm, ...data } = body;

    if (body.password !== password_confirm) {
      throw new BadRequestException('Password do not match !');
    }

    const hashed = await bcrypt.hash(body.password, 12);

    const user = await this.userService.save({
      ...data,
      password: hashed,
      user_type: 'teacher',
    });

    if (user) {
      await this.mailService.sendTeacherConfirmation(body.password, user.email);
      return {
        message: 'Teacher Created Successfully',
        data: user,
      };
    }

    return {
      message: 'Something went wrong',
    };
  }

  @Post('admin/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new NotFoundException('User not found with this email');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid login credentials !');
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      user_type: user.user_type,
    });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Login successful',
    };
  }

  @UseGuards(AuthGuard)
  @Get('admin/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'Logout Successfull',
    };
  }
}
