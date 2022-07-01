import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostResult } from './post-result';
import { PostResultService } from './post-result.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostResult])],
  providers: [PostResultService],
  exports: [PostResultService],
})
export class PostResultModule {}
