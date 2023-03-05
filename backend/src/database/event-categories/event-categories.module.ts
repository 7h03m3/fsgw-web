import { Module } from '@nestjs/common';
import { EventCategoriesService } from './event-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultValueModule } from '../default-value/default-value.module';
import { EventCategoryEntity } from './event-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventCategoryEntity]),
    DefaultValueModule,
  ],
  providers: [EventCategoriesService],
  controllers: [],
  exports: [EventCategoriesService],
})
export class EventCategoriesModule {}
