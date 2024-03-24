import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentManagerComponent } from './content-manager.component';
import { ContentManagerEventListComponent } from './components/content-manager-event-list/content-manager-event-list.component';
import { ContentManagerFilesComponent } from './components/content-manager-files/content-manager-files.component';
import { ContentManagerJskRegistrationListComponent } from './components/jsk-registration-list/content-manager-jsk-registration-list.component';
import { ContentManagerSettingsComponent } from './components/content-manager-settings/content-manager-settings.component';
import { ContentManagerNewsListComponent } from './components/content-manager-news-list/content-manager-news-list.component';
import { ContentManagerNewsEditComponent } from './components/content-manager-news-edit/content-manager-news-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ContentManagerComponent,
    children: [
      {
        path: '',
        redirectTo: 'files',
        pathMatch: 'full',
      },
      {
        path: 'event-list',
        component: ContentManagerEventListComponent,
      },
      {
        path: 'files',
        component: ContentManagerFilesComponent,
      },
      {
        path: 'jsk-registration-list',
        component: ContentManagerJskRegistrationListComponent,
      },
      {
        path: 'settings',
        component: ContentManagerSettingsComponent,
      },
      {
        path: 'news-list',
        component: ContentManagerNewsListComponent,
      },
      {
        path: 'news-edit',
        component: ContentManagerNewsEditComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentManagerRoutingModule {}
