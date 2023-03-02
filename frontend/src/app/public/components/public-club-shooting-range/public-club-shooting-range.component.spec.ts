import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicClubShootingRangeComponent } from './public-club-shooting-range.component';

describe('PublicClubShootingRangeComponent', () => {
  let component: PublicClubShootingRangeComponent;
  let fixture: ComponentFixture<PublicClubShootingRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicClubShootingRangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicClubShootingRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
