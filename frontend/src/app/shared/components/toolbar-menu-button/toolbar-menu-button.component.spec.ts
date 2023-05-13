import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarMenuButtonComponent } from './toolbar-menu-button.component';

describe('ToolbarMenuButtonComponent', () => {
  let component: ToolbarMenuButtonComponent;
  let fixture: ComponentFixture<ToolbarMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarMenuButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
