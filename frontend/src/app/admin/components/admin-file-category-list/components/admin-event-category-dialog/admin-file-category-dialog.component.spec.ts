import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFileCategoryDialogComponent } from './admin-file-category-dialog.component';

describe('AdminEventCategoryDialogComponent', () => {
  let component: AdminFileCategoryDialogComponent;
  let fixture: ComponentFixture<AdminFileCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFileCategoryDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminFileCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
