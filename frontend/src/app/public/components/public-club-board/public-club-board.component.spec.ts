import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicClubBoardComponent } from './public-club-board.component';

describe('PublicClubBoardComponent', () => {
  let component: PublicClubBoardComponent;
  let fixture: ComponentFixture<PublicClubBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicClubBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicClubBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
