import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classroom } from './classroom';
import { AbstractService } from '../shared/abstract.service';

@Injectable()
export class ClassRoomService extends AbstractService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {
    super(classroomRepository);
  }
}
