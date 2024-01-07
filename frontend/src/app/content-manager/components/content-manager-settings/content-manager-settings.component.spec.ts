import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentManagerSettingsComponent } from './content-manager-settings.component';

describe('ContentManagerSettingsComponent', () => {
  let component: ContentManagerSettingsComponent;
  let fixture: ComponentFixture<ContentManagerSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentManagerSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentManagerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
