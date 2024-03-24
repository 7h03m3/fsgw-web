import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerNewsListComponent } from './content-manager-news-list.component';

describe('ContentManagerNewsListComponent', () => {
  let component: ContentManagerNewsListComponent;
  let fixture: ComponentFixture<ContentManagerNewsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentManagerNewsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentManagerNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
