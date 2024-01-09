import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicJsRegistrationComponent } from './public-js-registration.component';

describe('PublicJsRegistrationComponent', () => {
  let component: PublicJsRegistrationComponent;
  let fixture: ComponentFixture<PublicJsRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicJsRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicJsRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
