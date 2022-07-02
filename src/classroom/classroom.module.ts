import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostResultModule } from '../post-result/post-result.module';
import { PostSubmissionModule } from '../post-submission/post-submission.module';
import { PostModule } from '../post/post.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';
import { Classroom } from './classroom';
import { ClassRoomController } from './classroom.controller';
import { ClassRoomService } from './classroom.service';

@Module({
  imports: [
    SharedModule,
    UserModule,
    SubscriptionModule,
    PostModule,
    PostResultModule,
    PostSubmissionModule,
    TypeOrmModule.forFeature([Classroom]),
  ],
  controllers: [ClassRoomController],
  providers: [ClassRoomService],
})
export class ClassroomModule {}
