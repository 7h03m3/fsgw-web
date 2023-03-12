import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDownloadsComponent } from './public-downloads.component';

describe('PublicDownloadsComponent', () => {
  let component: PublicDownloadsComponent;
  let fixture: ComponentFixture<PublicDownloadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicDownloadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
