import { Module } from '@nestjs/common';
import { ReportCourseRegistrationService } from './report-course-registration.service';

@Module({
  providers: [ReportCourseRegistrationService],
  exports: [ReportCourseRegistrationService],
})
export class ReportCourseRegistrationModule {}
