import { Module } from '@nestjs/common';
import { FileCategoriesService } from './file-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileCategoryEntity } from './file-category.entity';
import { DefaultValueModule } from '../default-value/default-value.module';

@Module({
  imports: [TypeOrmModule.forFeature([FileCategoryEntity]), DefaultValueModule],
  providers: [FileCategoriesService],
  controllers: [],
  exports: [FileCategoriesService],
})
export class FileCategoriesModule {}
