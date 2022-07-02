import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { User } from './user/user';
import { ClassroomModule } from './classroom/classroom.module';
import { Classroom } from './classroom/classroom';
import { SharedModule } from './shared/shared.module';
import { PostModule } from './post/post.module';
import { PostResultModule } from './post-result/post-result.module';
import { PostSubmissionModule } from './post-submission/post-submission.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Post } from './post/post';
import { PostResult } from './post-result/post-result';
import { PostSubmission } from './post-submission/post-submission';
import { Subscription } from './subscription/subscription';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ambassador',
      entities: [
        User,
        Classroom,
        Post,
        PostResult,
        PostSubmission,
        Subscription,
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    MailModule,
    ClassroomModule,
    SharedModule,
    PostModule,
    PostResultModule,
    PostSubmissionModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
