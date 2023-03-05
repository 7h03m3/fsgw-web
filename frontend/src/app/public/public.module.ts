import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { MaterialModule } from '../shared/material.module';
import { PublicRoutingModule } from './public-routing.module';
import { PublicWelcomeComponent } from './components/public-welcome/public-welcome.component';
import { PublicMiscNewWeaponLawComponent } from './components/public-misc-new-weapon-law/public-misc-new-weapon-law.component';
import { PublicMiscPersonalWeaponComponent } from './components/public-misc-personal-weapon/public-misc-personal-weapon.component';
import { PublicClubAboutUsComponent } from './components/public-club-about-us/public-club-about-us.component';
import { PublicClubShootingRangeComponent } from './components/public-club-shooting-range/public-club-shooting-range.component';
import { PublicClubBoardComponent } from './components/public-club-board/public-club-board.component';
import { PublicJsInformationComponent } from './components/public-js-information/public-js-information.component';
import { PublicEventListComponent } from './components/public-event-list/public-event-list.component';

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
    PublicEventListComponent,
  ],
  imports: [CommonModule, MaterialModule, PublicRoutingModule],
})
export class PublicModule {}
