import { Component, Inject, OnInit } from '@angular/core';
import { RegistrationDto } from '../../../shared/dtos/registration.dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegistrationType } from '../../../shared/enums/registration-type.enum';

@Component({
  selector: 'app-content-manager-jsk-registration-edit-dialog',
  templateUrl: './content-manager-jsk-registration-edit-dialog.component.html',
  styleUrl: './content-manager-jsk-registration-edit-dialog.component.css',
})
export class ContentManagerJskRegistrationEditDialogComponent
  implements OnInit
{
  public typeList = Object.values(RegistrationType);
  public birthDate = '';

  constructor(
    public dialogRef: MatDialogRef<ContentManagerJskRegistrationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RegistrationDto
  ) {}

  public ngOnInit() {
    const date = new Date(+this.data.birthDate);
    this.birthDate = date.toISOString();
  }

  public onSubmit(): void {
    const date = new Date(Date.parse(this.birthDate));
    this.data.birthDate = date.getTime();
    this.dialogRef.close(this.data);
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public isFormValid(): boolean {
    return (
      this.data.firstname != '' &&
      this.data.lastname != '' &&
      this.data.email != ''
    );
  }
}
