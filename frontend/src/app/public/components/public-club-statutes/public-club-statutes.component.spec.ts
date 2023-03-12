import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicClubStatutesComponent } from './public-club-statutes.component';

describe('PublicClubStatutesComponent', () => {
  let component: PublicClubStatutesComponent;
  let fixture: ComponentFixture<PublicClubStatutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicClubStatutesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicClubStatutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
