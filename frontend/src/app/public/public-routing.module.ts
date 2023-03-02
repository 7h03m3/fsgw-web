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
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
