import { TestBed } from '@angular/core/testing';

import { EventCategoryApiService } from './event-category-api.service';

describe('EventCategoryApiService', () => {
  let service: EventCategoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventCategoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
