import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerJskRegistrationInfoComponent } from './content-manager-jsk-registration-info.component';

describe('JskRegistrationInfoComponent', () => {
  let component: ContentManagerJskRegistrationInfoComponent;
  let fixture: ComponentFixture<ContentManagerJskRegistrationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentManagerJskRegistrationInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ContentManagerJskRegistrationInfoComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
