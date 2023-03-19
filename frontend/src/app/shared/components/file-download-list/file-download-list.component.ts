import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FileDto } from '../../dtos/file.dto';
import { StringHelper } from '../../classes/string-helper';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FileApiService } from '../../../api/file-api.service';
import { DownloadHelper } from '../../classes/download-helper';

@Component({
  selector: 'app-file-download-list',
  templateUrl: './file-download-list.component.html',
  styleUrls: ['./file-download-list.component.css'],
})
export class FileDownloadListComponent implements OnChanges {
  public dataSource = new MatTableDataSource<FileDto>();
  public displayedColumns = ['title', 'date', 'size', 'action'];
  public displayPaginator = false;
  public displayTable = false;
  @Input() fileList!: FileDto[];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;
  private displayPaginatorThreshold = 10;

  constructor(private fileApi: FileApiService) {}

  public ngOnInit() {}

  public getfileSizeString(file: FileDto): string {
    return StringHelper.getFileSizeString(file.size);
  }

  public getDateString(file: FileDto): string {
    return StringHelper.getDateTimeString(file.date);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.displayTable = this.fileList.length != 0;
    this.displayPaginator =
      this.fileList.length > this.displayPaginatorThreshold;
    this.dataSource.data = this.fileList;
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onDownload(file: FileDto) {
    this.fileApi.download(file).subscribe((response) => {
      DownloadHelper.downloadPdfFile(response, file);
    });
  }
}
