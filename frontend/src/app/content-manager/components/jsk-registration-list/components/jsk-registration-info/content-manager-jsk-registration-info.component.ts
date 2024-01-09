import { Component, Inject } from '@angular/core';
import { RegistrationDto } from '../../../../../shared/dtos/registration.dto';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-content-manager-jsk-registration-info',
  templateUrl: './content-manager-jsk-registration-info.component.html',
  styleUrl: './content-manager-jsk-registration-info.component.css',
})
export class ContentManagerJskRegistrationInfoComponent {
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: RegistrationDto) {}
}
