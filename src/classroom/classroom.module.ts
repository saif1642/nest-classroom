import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostResultModule } from 'src/post-result/post-result.module';
import { PostSubmission } from 'src/post-submission/post-submission';
import { PostModule } from 'src/post/post.module';
import { SubscriptionModule } from 'src/subscription/subscription.module';
import { UserModule } from 'src/user/user.module';
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
    PostSubmission,
    TypeOrmModule.forFeature([Classroom]),
  ],
  controllers: [ClassRoomController],
  providers: [ClassRoomService],
})
export class ClassroomModule {}
