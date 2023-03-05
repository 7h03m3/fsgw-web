import { Module } from '@nestjs/common';
import { DefaultValueService } from './default-value.service';

@Module({
  imports: [],
  providers: [DefaultValueService],
  controllers: [],
  exports: [DefaultValueService],
})
export class DefaultValueModule {}
