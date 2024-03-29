import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactMessageApi } from '../../../api/contact-message-api';
import { ContactMessageDto } from '../../../shared/dtos/contact-message.dto';
import { InfoDialogComponent } from '../../../shared/components/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ContactMessageService } from '../../../shared/services/contact-message.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsApiService } from '../../../api/settings-api.service';
import { SettingDto } from '../../../shared/dtos/setting.dto';
import { SettingType } from '../../../shared/enums/setting-type.enum';

@Component({
  selector: 'app-public-contact',
  templateUrl: './public-contact.component.html',
  styleUrls: ['./public-contact.component.css'],
})
export class PublicContactComponent implements OnInit {
  public readonly MaxMessageLength = 1024;
  public contactForm!: FormGroup;
  public setting = new SettingDto();
  public submitPressed = false;

  constructor(
    private contactApi: ContactMessageApi,
    private settingApi: SettingsApiService,
    private dialog: MatDialog,
    private router: Router,
    private contactMessageService: ContactMessageService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private snackBar: MatSnackBar
  ) {}

  public ngOnInit() {
    this.settingApi.getByType(SettingType.Contact).subscribe((response) => {
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
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [
        Validators.required,
        Validators.maxLength(this.MaxMessageLength),
      ]),
    });
  }

  public onSubmit() {
    this.submitPressed = true;
    const message = new ContactMessageDto();
    message.email = this.contactForm.value['email'];
    message.mobile = this.contactForm.value['mobile'];
    message.firstname = this.contactForm.value['firstname'];
    message.lastname = this.contactForm.value['lastname'];
    message.subject = this.contactForm.value['subject'];
    message.message = this.contactForm.value['message'];

    this.recaptchaV3Service.execute('contact_message').subscribe({
      next: (token) => {
        if (token) {
          this.sendMessage(message);
        }
      },
      error: (error) => {
        this.contactForm.reset();
        this.submitPressed = false;
        this.snackBar.open('Es ist ein Fehler aufgetreten: ' + error, 'okay');
        console.log('Error trying to verify request (reCaptcha v3): ' + error);
      },
    });
  }

  private sendMessage(message: ContactMessageDto) {
    this.contactApi.add(message).subscribe(() => {
      this.contactForm.reset();
      this.submitPressed = false;
      this.showInfoDialog();
    });
  }

  private showInfoDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {
        title: 'Nachricht eingereicht',
        text: 'Besten Dank für Ihre Nachricht. Wir werden sie baldmöglichst bearbeiten.',
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.contactMessageService.update();
      this.router.navigateByUrl('/');
    });
  }
}
