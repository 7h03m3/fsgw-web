import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerJskRegistrationEditDialogComponent } from './content-manager-jsk-registration-edit-dialog.component';

describe('JskRegistrationEditDialogComponent', () => {
  let component: ContentManagerJskRegistrationEditDialogComponent;
  let fixture: ComponentFixture<ContentManagerJskRegistrationEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentManagerJskRegistrationEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      ContentManagerJskRegistrationEditDialogComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
