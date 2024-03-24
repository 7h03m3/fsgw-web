import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './news.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
