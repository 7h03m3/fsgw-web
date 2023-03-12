import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [FilesService],
  controllers: [],
  exports: [FilesService],
})
export class FilesModule {}
