import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerJskRegistrationListComponent } from './content-manager-jsk-registration-list.component';

describe('JskRegistrationListComponent', () => {
  let component: ContentManagerJskRegistrationListComponent;
  let fixture: ComponentFixture<ContentManagerJskRegistrationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentManagerJskRegistrationListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ContentManagerJskRegistrationListComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
