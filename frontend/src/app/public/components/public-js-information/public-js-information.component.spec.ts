import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicJsInformationComponent } from './public-js-information.component';

describe('PublicJsInformationComponent', () => {
  let component: PublicJsInformationComponent;
  let fixture: ComponentFixture<PublicJsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicJsInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicJsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
