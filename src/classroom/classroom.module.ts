import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../shared/shared.module';
import { Classroom } from './classroom';
import { ClassRoomController } from './classroom.controller';
import { ClassRoomService } from './classroom.service';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Classroom])],
  controllers: [ClassRoomController],
  providers: [ClassRoomService],
  exports: [ClassRoomService],
})
export class ClassroomModule {}
