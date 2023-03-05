import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventCategoryDto } from '../../../shared/dtos/event-category.dto';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventCategoryApiService } from '../../../api/event-category-api.service';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { AdminEventCategoryDialogComponent } from './components/admin-event-category-dialog/admin-event-category-dialog.component';

@Component({
  selector: 'app-admin-event-category-list',
  templateUrl: './admin-event-category-list.component.html',
  styleUrls: ['./admin-event-category-list.component.css'],
})
export class AdminEventCategoryListComponent {
  public dataSource = new MatTableDataSource<EventCategoryDto>();
  public displayedColumns: string[] = ['name', 'abbreviation', 'action'];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private eventCategoryApi: EventCategoryApiService
  ) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public deleteCategory(category: EventCategoryDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName: category.name + ' (' + category.abbreviation + ')',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventCategoryApi
          .delete(category.id)
          .subscribe((data) => this.fetch());
      }
    });
  }

  public editCategory(category: EventCategoryDto) {
    this.openDialog(category);
  }

  public createCategory() {
    const category = new EventCategoryDto();
    this.openDialog(category);
  }

  private openDialog(category: EventCategoryDto) {
    const dialogRef = this.dialog.open(AdminEventCategoryDialogComponent, {
      data: {
        category: category,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetch();
    });
  }

  private fetch() {
    this.eventCategoryApi.getAll().subscribe((response) => {
      this.dataSource.data = response;
    });
  }
}
