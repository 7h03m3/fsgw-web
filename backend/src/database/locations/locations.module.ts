import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DefaultValueModule } from '../default-value/default-value.module';
import { LocationEntity } from './location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity]), DefaultValueModule],
  providers: [LocationsService],
  controllers: [],
  exports: [LocationsService],
})
export class LocationsModule {}
