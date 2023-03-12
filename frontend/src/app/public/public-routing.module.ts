import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { PublicWelcomeComponent } from './components/public-welcome/public-welcome.component';
import { PublicMiscNewWeaponLawComponent } from './components/public-misc-new-weapon-law/public-misc-new-weapon-law.component';
import { PublicMiscPersonalWeaponComponent } from './components/public-misc-personal-weapon/public-misc-personal-weapon.component';
import { PublicClubAboutUsComponent } from './components/public-club-about-us/public-club-about-us.component';
import { PublicClubShootingRangeComponent } from './components/public-club-shooting-range/public-club-shooting-range.component';
import { PublicClubBoardComponent } from './components/public-club-board/public-club-board.component';
import { PublicJsInformationComponent } from './components/public-js-information/public-js-information.component';
import { PublicEventListComponent } from './components/public-event-list/public-event-list.component';
import { PublicDownloadsComponent } from './components/public-downloads/public-downloads.component';
import { PublicResultsComponent } from './components/public-results/public-results.component';
import { PublicClubStatutesComponent } from './components/public-club-statutes/public-club-statutes.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        component: PublicWelcomeComponent,
      },
      {
        path: 'event-list',
        component: PublicEventListComponent,
      },
      {
        path: 'club/about-us',
        component: PublicClubAboutUsComponent,
      },
      {
        path: 'club/shooting-range',
        component: PublicClubShootingRangeComponent,
      },
      {
        path: 'club/board',
        component: PublicClubBoardComponent,
      },
      {
        path: 'club/statutes',
        component: PublicClubStatutesComponent,
      },
      {
        path: 'results',
        component: PublicResultsComponent,
      },
      {
        path: 'js/information',
        component: PublicJsInformationComponent,
      },
      {
        path: 'misc/new-weapon-law',
        component: PublicMiscNewWeaponLawComponent,
      },
      {
        path: 'misc/personal-weapon',
        component: PublicMiscPersonalWeaponComponent,
      },
      {
        path: 'downloads',
        component: PublicDownloadsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
