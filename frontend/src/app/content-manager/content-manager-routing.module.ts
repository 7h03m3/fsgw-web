import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentManagerComponent } from './content-manager.component';
import { ContentManagerEventListComponent } from './components/content-manager-event-list/content-manager-event-list.component';
import { ContentManagerFilesComponent } from './components/content-manager-files/content-manager-files.component';

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
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentManagerRoutingModule {}
