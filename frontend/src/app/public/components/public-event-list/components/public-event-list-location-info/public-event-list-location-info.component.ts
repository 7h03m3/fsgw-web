import { Component, Inject } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { LocationDto } from '../../../../../shared/dtos/location.dto';

@Component({
  selector: 'app-public-event-list-location-info',
  templateUrl: './public-event-list-location-info.component.html',
  styleUrls: ['./public-event-list-location-info.component.css'],
})
export class PublicEventListLocationInfoComponent {
  public location = new LocationDto();

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any,
    private sheet: MatBottomSheetRef<PublicEventListLocationInfoComponent>
  ) {}

  public ngOnInit() {
    if (this.data.location) {
      this.location = this.data.location;
    }
  }
}
