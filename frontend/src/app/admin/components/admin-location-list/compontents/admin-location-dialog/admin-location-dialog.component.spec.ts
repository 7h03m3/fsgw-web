import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLocationDialogComponent } from './admin-location-dialog.component';

describe('AdminLocationDialogComponent', () => {
  let component: AdminLocationDialogComponent;
  let fixture: ComponentFixture<AdminLocationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLocationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
