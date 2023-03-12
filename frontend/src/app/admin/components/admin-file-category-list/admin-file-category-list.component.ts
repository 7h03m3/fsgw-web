import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { FileCategoryDto } from '../../../shared/dtos/file-category.dto';
import { FileCategoryApiService } from '../../../api/file-category-api.service';
import { AdminFileCategoryDialogComponent } from './components/admin-event-category-dialog/admin-file-category-dialog.component';

@Component({
  selector: 'app-admin-file-category-list',
  templateUrl: './admin-file-category-list.component.html',
  styleUrls: ['./admin-file-category-list.component.css'],
})
export class AdminFileCategoryListComponent {
  public dataSource = new MatTableDataSource<FileCategoryDto>();
  public displayedColumns: string[] = ['name', 'abbreviation', 'action'];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private fileCategoryApi: FileCategoryApiService
  ) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public deleteCategory(category: FileCategoryDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName: category.name + ' (' + category.abbreviation + ')',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fileCategoryApi
          .delete(category.id)
          .subscribe((data) => this.fetch());
      }
    });
  }

  public editCategory(category: FileCategoryDto) {
    this.openDialog(category);
  }

  public createCategory() {
    const category = new FileCategoryDto();
    this.openDialog(category);
  }

  private openDialog(category: FileCategoryDto) {
    const dialogRef = this.dialog.open(AdminFileCategoryDialogComponent, {
      data: {
        category: category,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetch();
    });
  }

  private fetch() {
    this.fileCategoryApi.getAll().subscribe((response) => {
      this.dataSource.data = response;
    });
  }
}
