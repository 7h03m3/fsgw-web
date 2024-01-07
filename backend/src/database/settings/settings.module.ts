import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingEntity } from './settings.entity';
import { DefaultValueModule } from '../default-value/default-value.module';

@Module({
  imports: [TypeOrmModule.forFeature([SettingEntity]), DefaultValueModule],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
