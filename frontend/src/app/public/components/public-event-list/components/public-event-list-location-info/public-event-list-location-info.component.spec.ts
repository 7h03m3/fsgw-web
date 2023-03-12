import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEventListLocationInfoComponent } from './public-event-list-location-info.component';

describe('PublicEventListLocationInfoComponent', () => {
  let component: PublicEventListLocationInfoComponent;
  let fixture: ComponentFixture<PublicEventListLocationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicEventListLocationInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicEventListLocationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
