import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerFileDialogComponent } from './content-manager-file-dialog.component';

describe('AdminFileDialogComponent', () => {
  let component: ContentManagerFileDialogComponent;
  let fixture: ComponentFixture<ContentManagerFileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentManagerFileDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentManagerFileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
