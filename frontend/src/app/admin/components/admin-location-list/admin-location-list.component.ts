import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LocationDto } from '../../../shared/dtos/location.dto';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocationApiService } from '../../../api/location-api.service';
import { AdminLocationDialogComponent } from './compontents/admin-location-dialog/admin-location-dialog.component';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-admin-location-list',
  templateUrl: './admin-location-list.component.html',
  styleUrls: ['./admin-location-list.component.css'],
})
export class AdminLocationListComponent {
  public dataSource = new MatTableDataSource<LocationDto>();
  public displayedColumns: string[] = [
    'name',
    'street',
    'zip',
    'location',
    'action',
  ];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private locationApi: LocationApiService
  ) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public onDelete(location: LocationDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName: location.name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.locationApi.delete(location.id).subscribe((data) => this.fetch());
      }
    });
  }

  public onEdit(location: LocationDto) {
    this.openDialog(location);
  }

  public onCreate() {
    const location = new LocationDto();
    this.openDialog(location);
  }

  private openDialog(location: LocationDto) {
    const dialogRef = this.dialog.open(AdminLocationDialogComponent, {
      data: {
        location: location,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetch();
    });
  }

  private fetch() {
    this.locationApi.getAll().subscribe((response) => {
      this.dataSource.data = response;
    });
  }
}
