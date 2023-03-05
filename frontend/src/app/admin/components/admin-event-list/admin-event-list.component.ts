import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventDto } from '../../../shared/dtos/event.dto';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EventApiService } from '../../../api/event-api.service';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { StringHelper } from '../../../shared/classes/string-helper';
import { AdminEventDialogComponent } from './components/admin-event-dialog/admin-event-dialog.component';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.css'],
})
export class AdminEventListComponent {
  public dataSource = new MatTableDataSource<EventDto>();
  public displayedColumns: string[] = [
    'date',
    'title',
    'category',
    'location',
    'public',
    'action',
  ];

  constructor(
    public dialog: MatDialog,
    private eventApi: EventApiService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public onDelete(element: EventDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName:
          element.title +
          ' (' +
          StringHelper.getDateString(element.start) +
          ' ' +
          StringHelper.getTimeString(element.start) +
          ')',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventApi.delete(element.id).subscribe((data) => this.fetch());
      }
    });
  }

  public onEdit(event: EventDto) {
    this.openDialog(event);
  }

  public onCreate() {
    const event = new EventDto();
    event.public = true;
    this.openDialog(event);
  }

  public getDateString(event: EventDto): string {
    return StringHelper.getStartEndDateTimeString(event.start, event.end);
  }

  public getDayString(event: EventDto): string {
    return StringHelper.getDayOfWeekShort(event.start);
  }

  private openDialog(event: EventDto) {
    const dialogRef = this.dialog.open(AdminEventDialogComponent, {
      data: {
        event: event,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetch();
    });
  }

  private fetch() {
    this.eventApi.getAll().subscribe((data) => {
      this.dataSource.data = data;
    });
  }
}
