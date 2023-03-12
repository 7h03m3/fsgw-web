import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerEventListComponent } from './content-manager-event-list.component';

describe('AdminEventListComponent', () => {
  let component: ContentManagerEventListComponent;
  let fixture: ComponentFixture<ContentManagerEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentManagerEventListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentManagerEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
