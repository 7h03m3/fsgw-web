import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventCategoryDialogComponent } from './admin-event-category-dialog.component';

describe('AdminEventCategoryDialogComponent', () => {
  let component: AdminEventCategoryDialogComponent;
  let fixture: ComponentFixture<AdminEventCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventCategoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
