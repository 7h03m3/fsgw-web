import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerEventDialogComponent } from './content-manager-event-dialog.component';

describe('AdminEventDialogComponent', () => {
  let component: ContentManagerEventDialogComponent;
  let fixture: ComponentFixture<ContentManagerEventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentManagerEventDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentManagerEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
