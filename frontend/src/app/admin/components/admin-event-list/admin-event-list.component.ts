import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventDto } from '../../../shared/dtos/event.dto';
import { MatDialog } from '@angular/material/dialog';
import { EventApiService } from '../../../api/event-api.service';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { StringHelper } from '../../../shared/classes/string-helper';
import { AdminEventDialogComponent } from './components/admin-event-dialog/admin-event-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventCategoryDto } from '../../../shared/dtos/event-category.dto';
import { EventCategoryApiService } from '../../../api/event-category-api.service';
import { UserSettingsService } from '../../../shared/services/user-settings.service';

@Component({
  selector: 'app-admin-event-list',
  templateUrl: './admin-event-list.component.html',
  styleUrls: ['./admin-event-list.component.css'],
})
export class AdminEventListComponent {
  public dataSource = new MatTableDataSource<EventDto>();
  public categoryList = new Array<EventCategoryDto>();
  public selectedCategory = 0;
  public displayedColumns: string[] = [
    'date',
    'title',
    'category',
    'location',
    'public',
    'action',
  ];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    public dialog: MatDialog,
    private eventApi: EventApiService,
    private categoryApi: EventCategoryApiService,
    private userSettings: UserSettingsService
  ) {}

  public ngOnInit(): void {
    this.categoryApi.getAll().subscribe((response) => {
      this.categoryList = new Array<EventCategoryDto>();

      const dummyEntry = new EventCategoryDto();
      dummyEntry.name = 'Alle';
      this.categoryList.push(dummyEntry);

      response.forEach((entry) => {
        this.categoryList.push(entry);
      });
    });

    this.fetch();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  public onCategoryChange(categoryId: number) {
    this.userSettings.setEventCategory(categoryId);
    this.selectedCategory = categoryId;
    this.fetch();
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
      if (this.selectedCategory != 0) {
        data = data.filter((entry) => {
          return entry.categoryId == this.selectedCategory;
        });
      }

      this.dataSource.data = data;
    });
  }
}
