import { Component } from '@angular/core';
import { FileDto } from '../../../shared/dtos/file.dto';
import { FileApiService } from '../../../api/file-api.service';

@Component({
  selector: 'app-public-club-statutes',
  templateUrl: './public-club-statutes.component.html',
  styleUrls: ['./public-club-statutes.component.css'],
})
export class PublicClubStatutesComponent {
  public fileListStatutes = new Array<FileDto>();
  public fileListRegulations = new Array<FileDto>();
  public displayedColumns = ['title', 'filename'];

  constructor(private fileApi: FileApiService) {}

  public ngOnInit() {
    this.fileApi.getByCategory('STA').subscribe((response) => {
      this.fileListStatutes = response;
    });

    this.fileApi.getByCategory('REG').subscribe((response) => {
      this.fileListRegulations = response;
    });
  }
}
