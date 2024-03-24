import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileApiService } from '../../../api/file-api.service';
import { FileDto } from '../../../shared/dtos/file.dto';
import { SortHelper } from '../../../shared/classes/sort-helper';
import { UserSettingsService } from '../../../shared/services/user-settings.service';

@Component({
  selector: 'app-public-results',
  templateUrl: './public-results.component.html',
  styleUrls: ['./public-results.component.css'],
})
export class PublicResultsComponent {
  public yearString = '';
  public fileList = new Array<FileDto>();
  public showYearSelector = false;

  constructor(
    private route: ActivatedRoute,
    private fileApi: FileApiService,
    private userSettings: UserSettingsService
  ) {}

  public ngOnInit() {
    this.route.paramMap.subscribe((data) => {
      const yearString = data.get('year');

      this.showYearSelector = yearString != null;
      if (this.showYearSelector) {
        this.userSettings.setCurrentYear(+yearString!);
      }
      this.fetch(yearString);
    });
  }

  public onYearChange() {
    this.fetch(this.userSettings.getCurrentYear().toString());
  }

  private fetch(yearString: string | null) {
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
  }
}
