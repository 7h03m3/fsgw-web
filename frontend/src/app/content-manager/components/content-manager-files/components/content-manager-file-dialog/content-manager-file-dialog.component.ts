import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileCategoryApiService } from '../../../../../api/file-category-api.service';
import { FileApiService } from '../../../../../api/file-api.service';
import { FileDto } from '../../../../../shared/dtos/file.dto';
import { catchError, EMPTY } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileCategoryDto } from '../../../../../shared/dtos/file-category.dto';

export interface AdminFileDialogData {
  file: FileDto;
}

@Component({
  selector: 'app-content-manager-file-dialog',
  templateUrl: './content-manager-file-dialog.component.html',
  styleUrls: ['./content-manager-file-dialog.component.css'],
})
export class ContentManagerFileDialogComponent {
  public dto = new FileDto();
  public file: File | undefined;
  public categoryList = new Array<FileCategoryDto>();
  public existingFile = false;

  constructor(
    public dialogRef: MatDialogRef<ContentManagerFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminFileDialogData,
    private fileApi: FileApiService,
    private snackBar: MatSnackBar,
    private categoryApi: FileCategoryApiService
  ) {}

  public ngOnInit(): void {
    this.categoryApi.getAll().subscribe((response) => {
      this.categoryList = response;
    });

    this.existingFile = this.data.file.id != 0;
    if (this.existingFile) {
      this.dto = this.data.file;
    }
  }

  public onSubmit(): void {
    if (this.existingFile) {
      this.fileApi.update(this.dto).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.createFile();
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      const file = fileList[0];
      this.fileApi.getByFilename(file.name).subscribe((response) => {
        if (response == null) {
          this.file = file;
          this.dto.filename = this.file.name;
          this.dto.mimetype = this.file.type;
          this.dto.size = this.file.size;
        } else {
          this.file = undefined;
          this.openSnackBar('Diese Datei existiert bereits');
        }
      });
    }
  }

  public onFileDeselected() {
    this.file = undefined;
    this.dto.filename = '';
    this.dto.mimetype = '';
    this.dto.size = 0;
  }

  public areDataValid(): boolean {
    if (this.existingFile) {
      return this.dto.title != '' && this.dto.categoryId != 0;
    }
    return (
      this.file != undefined && this.dto.title != '' && this.dto.categoryId != 0
    );
  }

  private openSnackBar(message: string) {
    const ref = this.snackBar.open(message, 'Verbergen', {
      duration: 3000,
      verticalPosition: 'bottom',
    });

    ref.afterDismissed().subscribe((data) => {});
  }

  private createFile() {
    if (!this.file) {
      return;
    }

    this.fileApi
      .upload(this.file, this.dto)
      .pipe(
        catchError(() => {
          this.openSnackBar('Upload fehlgeschlagen.');
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
