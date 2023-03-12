import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileApiService } from '../../../api/file-api.service';
import { FileDto } from '../../../shared/dtos/file.dto';
import { SortHelper } from '../../../shared/classes/sort-helper';

@Component({
  selector: 'app-public-results',
  templateUrl: './public-results.component.html',
  styleUrls: ['./public-results.component.css'],
})
export class PublicResultsComponent {
  public yearString = '';
  public fileList = new Array<FileDto>();

  constructor(private route: ActivatedRoute, private fileApi: FileApiService) {}

  public ngOnInit() {
    this.route.paramMap.subscribe((data) => {
      const yearString = data.get('year');

      if (yearString != null) {
        this.yearString = yearString;

        this.fileApi
          .getByCategoryAndYear('RES', parseInt(yearString))
          .subscribe((response) => {
            this.fileList = response;
            SortHelper.sortFilesByDate(this.fileList, false);
          });
      } else {
        this.yearString = '';

        this.fileApi.getByCategory('RES').subscribe((response) => {
          this.fileList = response;
          SortHelper.sortFilesByDate(this.fileList, false);
        });
      }
    });
  }
}
