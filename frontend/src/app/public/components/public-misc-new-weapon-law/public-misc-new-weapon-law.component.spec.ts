import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMiscNewWeaponLawComponent } from './public-misc-new-weapon-law.component';

describe('PublicMiscNewWeaponLawComponent', () => {
  let component: PublicMiscNewWeaponLawComponent;
  let fixture: ComponentFixture<PublicMiscNewWeaponLawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicMiscNewWeaponLawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicMiscNewWeaponLawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
