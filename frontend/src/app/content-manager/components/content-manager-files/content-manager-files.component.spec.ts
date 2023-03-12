import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerFilesComponent } from './content-manager-files.component';

describe('AdminFilesComponent', () => {
  let component: ContentManagerFilesComponent;
  let fixture: ComponentFixture<ContentManagerFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentManagerFilesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentManagerFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
