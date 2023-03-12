import { Component } from '@angular/core';
import { FileApiService } from '../../../api/file-api.service';
import { FileDto } from '../../../shared/dtos/file.dto';

@Component({
  selector: 'app-public-downloads',
  templateUrl: './public-downloads.component.html',
  styleUrls: ['./public-downloads.component.css'],
})
export class PublicDownloadsComponent {
  public fileListEvents = new Array<FileDto>();
  public fileListMisc = new Array<FileDto>();
  public displayedColumns = ['title', 'filename'];

  constructor(private fileApi: FileApiService) {}

  public ngOnInit() {
    this.fileApi.getByCategory('VER').subscribe((response) => {
      this.fileListEvents = response;
    });

    this.fileApi.getByCategory('DIV').subscribe((response) => {
      this.fileListMisc = response;
    });
  }
}
