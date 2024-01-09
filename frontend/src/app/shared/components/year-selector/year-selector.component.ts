import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { UserSettingsService } from '../../services/user-settings.service';

@Component({
  selector: 'app-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class YearSelectorComponent {
  private static YearRange = 10;
  public selectedYear = 0;
  public yearList = new Array<number>();
  @Output() yearChangeEvent = new EventEmitter<number>();

  constructor(private userSettings: UserSettingsService) {}

  public ngOnInit() {
    this.selectedYear = this.userSettings.getCurrentYear();
    for (
      let i = -1 * YearSelectorComponent.YearRange;
      i <= YearSelectorComponent.YearRange;
      i++
    ) {
      this.yearList.push(this.selectedYear + i);
    }
  }

  public onYearChange(year: number) {
    this.selectedYear = +year;
    this.userSettings.setCurrentYear(this.selectedYear);
    this.yearChangeEvent.emit(this.selectedYear);
  }
}
