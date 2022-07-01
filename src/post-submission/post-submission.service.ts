import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { PostSubmission } from './post-submission';

@Injectable()
export class PostSubmissionService extends AbstractService {
  constructor(
    @InjectRepository(PostSubmission)
    private readonly postSubmissionRepository: Repository<PostSubmission>,
  ) {
    super(postSubmissionRepository);
  }
}
