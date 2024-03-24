import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';
import { ContentManagerRoutingModule } from './content-manager-routing.module';
import { ContentManagerEventListComponent } from './components/content-manager-event-list/content-manager-event-list.component';
import { ContentManagerEventDialogComponent } from './components/content-manager-event-list/components/content-manager-event-dialog/content-manager-event-dialog.component';
import { ContentManagerFilesComponent } from './components/content-manager-files/content-manager-files.component';
import { ContentManagerFileDialogComponent } from './components/content-manager-files/components/content-manager-file-dialog/content-manager-file-dialog.component';
import { CommonModule } from '@angular/common';
import { ContentManagerComponent } from './content-manager.component';
import { ContentManagerJskRegistrationListComponent } from './components/jsk-registration-list/content-manager-jsk-registration-list.component';
import { ContentManagerJskRegistrationEditDialogComponent } from './components/jsk-registration-edit-dialog/content-manager-jsk-registration-edit-dialog.component';
import { ContentManagerJskRegistrationInfoComponent } from './components/jsk-registration-list/components/jsk-registration-info/content-manager-jsk-registration-info.component';
import { ContentManagerSettingsComponent } from './components/content-manager-settings/content-manager-settings.component';
import { ContentManagerNewsEditComponent } from './components/content-manager-news-edit/content-manager-news-edit.component';
import { ContentManagerNewsListComponent } from './components/content-manager-news-list/content-manager-news-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ContentManagerRoutingModule,
  ],
  declarations: [
    ContentManagerComponent,
    ContentManagerEventListComponent,
    ContentManagerEventDialogComponent,
    ContentManagerFilesComponent,
    ContentManagerFileDialogComponent,
    ContentManagerJskRegistrationListComponent,
    ContentManagerJskRegistrationEditDialogComponent,
    ContentManagerJskRegistrationInfoComponent,
    ContentManagerSettingsComponent,
    ContentManagerNewsEditComponent,
    ContentManagerNewsListComponent,
  ],
})
export class ContentManagerModule {}
