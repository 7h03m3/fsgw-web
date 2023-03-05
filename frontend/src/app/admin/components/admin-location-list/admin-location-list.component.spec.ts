import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLocationListComponent } from './admin-location-list.component';

describe('AdminLocationListComponent', () => {
  let component: AdminLocationListComponent;
  let fixture: ComponentFixture<AdminLocationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLocationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
