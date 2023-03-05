import { Component, Inject } from '@angular/core';
import { EventCategoryDto } from '../../../../../shared/dtos/event-category.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventCategoryApiService } from '../../../../../api/event-category-api.service';

export interface AdminEventCategoryDialogData {
  category: EventCategoryDto;
}

@Component({
  selector: 'app-admin-event-category-dialog',
  templateUrl: './admin-event-category-dialog.component.html',
  styleUrls: ['./admin-event-category-dialog.component.css'],
})
export class AdminEventCategoryDialogComponent {
  public formValid = true;
  public submitButtonDisable = false;

  constructor(
    public dialogRef: MatDialogRef<AdminEventCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminEventCategoryDialogData,
    private categoryApi: EventCategoryApiService
  ) {}

  public ngOnInit(): void {}

  public onSubmit(): void {
    this.submitButtonDisable = true;

    if (this.data.category.id == 0) {
      this.categoryApi.create(this.data.category).subscribe((response) => {
        this.dialogRef.close(this.data.category);
      });
    } else {
      this.categoryApi.update(this.data.category).subscribe((response) => {
        this.dialogRef.close(this.data.category);
      });
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
