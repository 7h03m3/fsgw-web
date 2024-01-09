import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationApiService } from '../../../api/registration-api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationDto } from '../../../shared/dtos/registration.dto';
import { InfoDialogComponent } from '../../../shared/components/info-dialog/info-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { RegistrationType } from '../../../shared/enums/registration-type.enum';
import { SettingsApiService } from '../../../api/settings-api.service';
import { SettingDto } from '../../../shared/dtos/setting.dto';
import { SettingType } from '../../../shared/enums/setting-type.enum';

@Component({
  selector: 'app-public-js-registration',
  templateUrl: './public-js-registration.component.html',
  styleUrl: './public-js-registration.component.css',
})
export class PublicJsRegistrationComponent implements OnInit {
  public contactForm!: FormGroup;
  public courseText = '';
  public setting = new SettingDto();
  public submitPressed = false;
  private courseType = RegistrationType.JSK;

  constructor(
    private registrationApi: RegistrationApiService,
    private settingApi: SettingsApiService,
    private dialog: MatDialog,
    private router: Router,
    private recaptchaV3Service: ReCaptchaV3Service,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    this.settingApi
      .getByType(SettingType.CourseRegistration)
      .subscribe((response) => {
        this.setting = response;
      });
    this.contactForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/
        ),
      ]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required, Validators.min(1000)]),
      location: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      insuranceNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/[7][5][6][.][\d]{4}[.][\d]{4}[.][\d]{2}$/),
      ]),
    });
  }

  public onDateChange(event: MatDatepickerInputEvent<any>) {
    const currentYear = new Date().getFullYear();
    const date = new Date(event.value);

    if (currentYear <= date.getFullYear()) {
      this.contactForm.reset('birthDate');
      this.courseText = '';
      return;
    }

    const age = currentYear - date.getFullYear();
    if (age >= 15 && age <= 20) {
      this.courseType = RegistrationType.JSK;
      this.courseText = 'Jungschützenkurs';
    } else if (age >= 10 && age < 15) {
      this.courseType = RegistrationType.JJK;
      this.courseText = 'Juniorenkurs';
    } else {
      this.contactForm.reset('birthDate');
      this.courseText = '';
      this.dialog.open(InfoDialogComponent, {
        data: {
          title: 'Ungültiges Alter',
          text: 'Für den Jungschützenkurs musst du zwischen 15 & 20 Jahre alt sein. \nFür den Juniorenkurs musst du zwischen 10 & 14 Jahre alt sein.',
        },
      });
      return;
    }
  }

  public onSubmit() {
    this.submitPressed = true;
    const registration = new RegistrationDto();
    registration.email = this.contactForm.value['email'];
    registration.mobile = this.contactForm.value['mobile'];
    registration.firstname = this.contactForm.value['firstname'];
    registration.lastname = this.contactForm.value['lastname'];
    registration.street = this.contactForm.value['street'];
    registration.zip = +this.contactForm.value['zip'];
    registration.location = this.contactForm.value['location'];
    registration.nationality = this.contactForm.value['nationality'];
    registration.insuranceNumber = this.contactForm.value['insuranceNumber'];
    registration.type = this.courseType;

    const date = new Date(Date.parse(this.contactForm.value['birthDate']));
    registration.birthDate = date.getTime();

    this.recaptchaV3Service.execute('js_registration').subscribe({
      next: (token) => {
        if (token) {
          this.sendRegistration(registration);
        }
      },
      error: (error) => {
        this.contactForm.reset();
        this.submitPressed = false;
        this.courseText = '';
        this.snackBar.open('Es ist ein Fehler aufgetreten: ' + error, 'okay');
        console.log('Error trying to verify request (reCaptcha v3): ' + error);
      },
    });
  }

  private sendRegistration(registration: RegistrationDto) {
    this.registrationApi.create(registration).subscribe(() => {
      this.contactForm.reset();
      this.submitPressed = false;
      this.showInfoDialog();
    });
  }

  private showInfoDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: 'Anmeldung eingereicht',
        text: 'Besten Dank für deine Anmeldung. Du wirst in kürze ein E-Mail mit weiteren Informationen erhalten.',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}
