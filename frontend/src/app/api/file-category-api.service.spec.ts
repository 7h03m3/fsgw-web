import { TestBed } from '@angular/core/testing';

import { FileCategoryApiService } from './file-category-api.service';

describe('FileCategoryApiService', () => {
  let service: FileCategoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileCategoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
