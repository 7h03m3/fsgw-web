import { NgModule } from '@angular/core';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicWelcomeComponent } from './components/public-welcome/public-welcome.component';
import { PublicMiscNewWeaponLawComponent } from './components/public-misc-new-weapon-law/public-misc-new-weapon-law.component';
import { PublicMiscPersonalWeaponComponent } from './components/public-misc-personal-weapon/public-misc-personal-weapon.component';
import { PublicClubAboutUsComponent } from './components/public-club-about-us/public-club-about-us.component';
import { PublicClubShootingRangeComponent } from './components/public-club-shooting-range/public-club-shooting-range.component';
import { PublicClubBoardComponent } from './components/public-club-board/public-club-board.component';
import { PublicJsInformationComponent } from './components/public-js-information/public-js-information.component';
import { PublicEventListComponent } from './components/public-event-list/public-event-list.component';
import { PublicEventListLocationInfoComponent } from './components/public-event-list/components/public-event-list-location-info/public-event-list-location-info.component';
import { PublicDownloadsComponent } from './components/public-downloads/public-downloads.component';
import { MaterialModule } from '../shared/material.module';
import { PublicResultsComponent } from './components/public-results/public-results.component';
import { PublicClubStatutesComponent } from './components/public-club-statutes/public-club-statutes.component';
import { SharedModule } from '../shared/shared.module';
import { PublicJsRegistrationComponent } from './components/public-js-registration/public-js-registration.component';
import { RecaptchaV3Module } from 'ng-recaptcha';
import { CommonModule } from '@angular/common';
import { PublicContactComponent } from './components/public-contact/public-contact.component';

@NgModule({
  declarations: [
    PublicComponent,
    PublicWelcomeComponent,
    PublicMiscNewWeaponLawComponent,
    PublicMiscPersonalWeaponComponent,
    PublicClubAboutUsComponent,
    PublicClubShootingRangeComponent,
    PublicClubBoardComponent,
    PublicJsInformationComponent,
    PublicJsRegistrationComponent,
    PublicEventListComponent,
    PublicEventListLocationInfoComponent,
    PublicDownloadsComponent,
    PublicResultsComponent,
    PublicClubStatutesComponent,
    PublicContactComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    PublicRoutingModule,
    RecaptchaV3Module,
  ],
})
export class PublicModule {}
