import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerNewsEditComponent } from './content-manager-news-edit.component';

describe('ContentManagerNewsEditComponent', () => {
  let component: ContentManagerNewsEditComponent;
  let fixture: ComponentFixture<ContentManagerNewsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentManagerNewsEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentManagerNewsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
