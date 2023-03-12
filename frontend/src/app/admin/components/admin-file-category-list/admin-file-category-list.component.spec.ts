import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFileCategoryListComponent } from './admin-file-category-list.component';

describe('AdminFileCategoryListComponent', () => {
  let component: AdminFileCategoryListComponent;
  let fixture: ComponentFixture<AdminFileCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFileCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFileCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
