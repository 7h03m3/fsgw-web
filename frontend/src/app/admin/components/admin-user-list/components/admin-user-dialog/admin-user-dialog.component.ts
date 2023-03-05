import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDto } from '../../../../../shared/dtos/user.dto';
import { UserApiService } from '../../../../../api/user-api.service';
import { UserRole } from '../../../../../shared/enums/user-role.enum';
import { MatSelectionListChange } from '@angular/material/list';

export interface AdminUserDialogData {
  user: UserDto;
}

@Component({
  selector: 'app-admin-user-dialog',
  templateUrl: './admin-user-dialog.component.html',
  styleUrls: ['./admin-user-dialog.component.css'],
})
export class AdminUserDialogComponent {
  public formValid = true;
  public passwordRequired = true;
  public hidePassword = true;
  public submitButtonDisable = false;
  public userRoles = Object.values(UserRole);

  constructor(
    public dialogRef: MatDialogRef<AdminUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminUserDialogData,
    private userApi: UserApiService
  ) {}

  public ngOnInit(): void {
    this.passwordRequired = this.data.user.id == 0;
  }

  public onSubmit(): void {
    this.submitButtonDisable = true;

    if (this.data.user.id == 0) {
      this.userApi.create(this.data.user).subscribe((response) => {
        this.dialogRef.close(this.data.user);
      });
    } else {
      this.userApi.update(this.data.user).subscribe((response) => {
        this.dialogRef.close(this.data.user);
      });
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onChange(event: MatSelectionListChange) {
    const isAnonymous =
      event.options.find((entry) => {
        return entry.value == UserRole.Anonymous && entry.selected;
      }) != undefined;

    if (isAnonymous) {
      this.data.user.roles.length = 0;
      this.data.user.roles.push(UserRole.Anonymous);
    } else {
      event.options.forEach((option) => {
        if (option.selected) {
          this.data.user.roles.push(option.value);
        } else {
          this.data.user.roles = this.data.user.roles.filter((value) => {
            return value != option.value;
          });
        }
      });
    }
  }

  public isRoleSelected(role: UserRole) {
    return this.data.user.roles.includes(role);
  }

  public isOptionDisabled(role: UserRole) {
    const isAnonymous = this.data.user.roles.includes(UserRole.Anonymous);
    return isAnonymous && role != UserRole.Anonymous;
  }
}
