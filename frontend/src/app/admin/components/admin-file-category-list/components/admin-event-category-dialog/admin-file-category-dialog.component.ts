import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileCategoryApiService } from '../../../../../api/file-category-api.service';
import { FileCategoryDto } from '../../../../../shared/dtos/file-category.dto';

export interface AdminFileCategoryDialogData {
  category: FileCategoryDto;
}

@Component({
  selector: 'app-admin-file-category-dialog',
  templateUrl: './admin-file-category-dialog.component.html',
  styleUrls: ['./admin-file-category-dialog.component.css'],
})
export class AdminFileCategoryDialogComponent {
  public formValid = true;
  public submitButtonDisable = false;

  constructor(
    public dialogRef: MatDialogRef<AdminFileCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminFileCategoryDialogData,
    private categoryApi: FileCategoryApiService
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
