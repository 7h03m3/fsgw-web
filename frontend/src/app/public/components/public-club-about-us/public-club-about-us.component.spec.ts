import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicClubAboutUsComponent } from './public-club-about-us.component';

describe('PublicClubAboutUsComponent', () => {
  let component: PublicClubAboutUsComponent;
  let fixture: ComponentFixture<PublicClubAboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicClubAboutUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicClubAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
