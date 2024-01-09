import { Test, TestingModule } from '@nestjs/testing';
import { ReportCourseRegistrationService } from './report-course-registration.service';

describe('CourseRegistrationService', () => {
  let service: ReportCourseRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportCourseRegistrationService],
    }).compile();

    service = module.get<ReportCourseRegistrationService>(
      ReportCourseRegistrationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
