import { Component, Inject } from '@angular/core';
import { LocationDto } from '../../../../../shared/dtos/location.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocationApiService } from '../../../../../api/location-api.service';

export interface AdminLocationDialogData {
  location: LocationDto;
}

@Component({
  selector: 'app-admin-location-dialog',
  templateUrl: './admin-location-dialog.component.html',
  styleUrls: ['./admin-location-dialog.component.css'],
})
export class AdminLocationDialogComponent {
  public formValid = true;
  public submitButtonDisable = false;

  constructor(
    public dialogRef: MatDialogRef<AdminLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminLocationDialogData,
    private locationApi: LocationApiService
  ) {}

  public ngOnInit(): void {}

  public onSubmit(): void {
    this.submitButtonDisable = true;

    if (this.data.location.id == 0) {
      this.locationApi.create(this.data.location).subscribe((response) => {
        this.dialogRef.close(this.data.location);
      });
    } else {
      this.locationApi.update(this.data.location).subscribe((response) => {
        this.dialogRef.close(this.data.location);
      });
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
