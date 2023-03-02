import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicMiscPersonalWeaponComponent } from './public-misc-personal-weapon.component';

describe('PublicMiscPersonalWeaponComponent', () => {
  let component: PublicMiscPersonalWeaponComponent;
  let fixture: ComponentFixture<PublicMiscPersonalWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicMiscPersonalWeaponComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicMiscPersonalWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
