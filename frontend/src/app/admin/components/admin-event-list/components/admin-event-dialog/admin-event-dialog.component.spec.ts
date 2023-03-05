import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventDialogComponent } from './admin-event-dialog.component';

describe('AdminEventDialogComponent', () => {
  let component: AdminEventDialogComponent;
  let fixture: ComponentFixture<AdminEventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
