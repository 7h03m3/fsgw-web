import { Component, Inject } from '@angular/core';
import { EventDto } from '../../../../../shared/dtos/event.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventApiService } from '../../../../../api/event-api.service';
import { EventCategoryDto } from '../../../../../shared/dtos/event-category.dto';
import { LocationDto } from '../../../../../shared/dtos/location.dto';
import { EventCategoryApiService } from '../../../../../api/event-category-api.service';
import { LocationApiService } from '../../../../../api/location-api.service';
import { StringHelper } from '../../../../../shared/classes/string-helper';

export interface AdminEventDialogData {
  event: EventDto;
}

@Component({
  selector: 'app-admin-event-dialog',
  templateUrl: './admin-event-dialog.component.html',
  styleUrls: ['./admin-event-dialog.component.css'],
})
export class AdminEventDialogComponent {
  public formValid = true;
  public submitButtonDisable = false;
  public startDate = '';
  public endDate = '';
  public startTime = '';
  public endTime = '';
  public categoryList = new Array<EventCategoryDto>();
  public locationList = new Array<LocationDto>();

  constructor(
    public dialogRef: MatDialogRef<AdminEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminEventDialogData,
    private eventApi: EventApiService,
    private categoryApi: EventCategoryApiService,
    private locationApi: LocationApiService
  ) {}

  public ngOnInit(): void {
    this.categoryApi.getAll().subscribe((response) => {
      this.categoryList = response;
    });

    this.locationApi.getAll().subscribe((response) => {
      this.locationList = response;
    });

    if (this.data.event.id != 0) {
      this.startTime = StringHelper.getTimeString(this.data.event.start);
      this.endTime = StringHelper.getTimeString(this.data.event.end);

      const startDate = new Date(+this.data.event.start);
      startDate.setUTCHours(0, 0, 0, 0);
      this.startDate = startDate.toISOString();

      const endDate = new Date(+this.data.event.end);
      endDate.setUTCHours(0, 0, 0, 0);
      this.endDate = endDate.toISOString();
    } else {
      const date = new Date();
      this.startTime = StringHelper.getTimeString(date.getTime());
      this.endTime = StringHelper.getTimeString(date.getTime());

      date.setUTCHours(0, 0, 0, 0);
      this.startDate = date.toISOString();
      this.endDate = date.toISOString();
    }
  }

  public onSubmit(): void {
    this.data.event.start = StringHelper.getDate(
      this.startDate,
      this.startTime
    );

    this.data.event.end = StringHelper.getDate(this.endDate, this.endTime);
    this.submitButtonDisable = true;

    if (this.data.event.id == 0) {
      this.eventApi.create(this.data.event).subscribe((response) => {
        this.dialogRef.close(this.data.event);
      });
    } else {
      this.eventApi.update(this.data.event).subscribe((response) => {
        this.dialogRef.close(this.data.event);
      });
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public isFormValid(): boolean {
    const event = this.data.event;

    return event.categoryId != 0 && event.locationId != 0;
  }

  public onStartDateChange(): void {
    this.endDate = this.startDate;
  }

  public onStartTimeChange(): void {
    this.endTime = this.startTime;
  }
}
