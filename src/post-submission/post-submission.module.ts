import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostSubmission } from './post-submission';
import { PostSubmissionService } from './post-submission.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostSubmission])],
  providers: [PostSubmissionService],
  exports: [PostSubmissionService],
})
export class PostSubmissionModule {}
