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

@NgModule({
  declarations: [
    ContentManagerComponent,
    ContentManagerEventListComponent,
    ContentManagerEventDialogComponent,
    ContentManagerFilesComponent,
    ContentManagerFileDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ContentManagerRoutingModule,
  ],
})
export class ContentManagerModule {}
