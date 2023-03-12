import { Component, ViewChild } from '@angular/core';
import { FileApiService } from '../../../api/file-api.service';
import { MatTableDataSource } from '@angular/material/table';
import { FileDto } from '../../../shared/dtos/file.dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StringHelper } from '../../../shared/classes/string-helper';
import { DeleteConfirmDialogComponent } from '../../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ContentManagerFileDialogComponent } from './components/content-manager-file-dialog/content-manager-file-dialog.component';
import { DownloadHelper } from '../../../shared/classes/download-helper';

@Component({
  selector: 'app-content-manager-files',
  templateUrl: './content-manager-files.component.html',
  styleUrls: ['./content-manager-files.component.css'],
})
export class ContentManagerFilesComponent {
  public dataSource = new MatTableDataSource<FileDto>();
  public displayedColumns: string[] = [
    'title',
    'filename',
    'date',
    'category',
    'size',
    'action',
  ];

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(private fileApi: FileApiService, public dialog: MatDialog) {}

  public ngOnInit(): void {
    this.fetch();
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onCreate() {
    const file = new FileDto();
    this.openDialog(file);
  }

  public onEdit(file: FileDto) {
    this.openDialog(file);
  }

  public onDelete(file: FileDto) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        itemName: file.title + ' (' + this.getDateString(file) + ')',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fileApi.delete(file.id).subscribe((data) => this.fetch());
      }
    });
  }

  public onDownload(file: FileDto) {
    this.fileApi.download(file).subscribe((response) => {
      DownloadHelper.downloadPdfFile(response, file);
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getDateString(file: FileDto): string {
    return StringHelper.getDateTimeString(file.date);
  }

  public getFileSizeString(file: FileDto): string {
    return StringHelper.getFileSizeString(file.size);
  }

  private fetch() {
    this.fileApi.getAll().subscribe((response) => {
      this.dataSource.data = response;
    });
  }

  private openDialog(file: FileDto) {
    const dialogRef = this.dialog.open(ContentManagerFileDialogComponent, {
      data: {
        file: file,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetch();
    });
  }
}
