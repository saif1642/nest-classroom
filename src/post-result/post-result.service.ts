import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { PostResult } from './post-result';

@Injectable()
export class PostResultService extends AbstractService {
  constructor(
    @InjectRepository(PostResult)
    private readonly postResultRepository: Repository<PostResult>,
  ) {
    super(postResultRepository);
  }
}
