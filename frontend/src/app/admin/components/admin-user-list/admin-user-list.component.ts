import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserApiService } from '../../../api/user-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { UserDto } from '../../../shared/dtos/user.dto';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AdminUserDialogComponent } from './components/admin-user-dialog/admin-user-dialog.component';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
})
export class AdminUserListComponent {
  public dataSource = new MatTableDataSource<UserDto>();
  public displayedColumns: string[] = [
    'id',
    'username',
    'firstname',
    'lastname',
    'role',
    'action',
  ];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userApi: UserApiService
  ) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public deleteUser(user: UserDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName:
          user.userName + ' (' + user.firstName + ' ' + user.lastName + ')',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userApi.delete(user.id).subscribe((data) => this.fetch());
      }
    });
  }

  public editUser(user: UserDto) {
    this.openDialog(user);
  }

  public createUser() {
    const user = new UserDto();
    this.openDialog(user);
  }

  public getRoleText(user: UserDto): string {
    return user.roles.toString();
  }

  private openDialog(user: UserDto) {
    const dialogRef = this.dialog.open(AdminUserDialogComponent, {
      data: {
        user: user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetch();
    });
  }

  private fetch() {
    this.userApi.getAll().subscribe((response) => {
      this.dataSource.data = response;
    });
  }
}
