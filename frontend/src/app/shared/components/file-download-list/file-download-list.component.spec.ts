import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDownloadListComponent } from './file-download-list.component';

describe('FileDownloadListComponent', () => {
  let component: FileDownloadListComponent;
  let fixture: ComponentFixture<FileDownloadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileDownloadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileDownloadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
