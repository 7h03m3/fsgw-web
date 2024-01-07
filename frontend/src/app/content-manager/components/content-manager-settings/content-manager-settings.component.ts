import { Component, OnInit } from '@angular/core';
import { SettingsApiService } from '../../../api/settings-api.service';
import { SettingDto } from '../../../shared/dtos/setting.dto';
import { SettingType } from '../../../shared/enums/setting-type.enum';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-content-manager-settings',
  templateUrl: './content-manager-settings.component.html',
  styleUrl: './content-manager-settings.component.css',
})
export class ContentManagerSettingsComponent implements OnInit {
  public contactSetting = new SettingDto();
  public courseRegistrationSetting = new SettingDto();

  constructor(
    private settingsApi: SettingsApiService,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    this.settingsApi.getByType(SettingType.Contact).subscribe((response) => {
      this.contactSetting = response;
    });

    this.settingsApi
      .getByType(SettingType.CourseRegistration)
      .subscribe((response) => {
        this.courseRegistrationSetting = response;
      });
  }

  public onContactSettingSave() {
    this.handleRequest(this.settingsApi.update(this.contactSetting));
  }

  public onCourseRegistrationSave() {
    this.handleRequest(this.settingsApi.update(this.courseRegistrationSetting));
  }

  public getEnableString(setting: SettingDto): string {
    return setting.enable ? 'Ein' : 'Aus';
  }

  private handleRequest(observable: Observable<any>) {
    observable
      .pipe(
        catchError((response) => {
          this.snackBar.open(
            'Fehler: "' + response.error.message + '"',
            'Okay',
            { duration: 10000 }
          );
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.snackBar.open('Einstellung gespeichert', 'Okay', {
          duration: 1000,
        });
      });
  }
}
