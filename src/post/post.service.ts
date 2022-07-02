import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { Post } from './post';

@Injectable()
export class PostService extends AbstractService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {
    super(postRepository);
  }

  async getUpcomingClassroomEvent(classroom_id: number) {
    return this.postRepository.find({ where: { classroom_id: classroom_id } });
  }
}
