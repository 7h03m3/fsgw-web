import { NgModule } from '@angular/core';
import { FileDownloadListComponent } from './components/file-download-list/file-download-list.component';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ToolbarMenuButtonComponent } from './components/toolbar-menu-button/toolbar-menu-button.component';
import { RouterModule } from '@angular/router';
import { YearSelectorStandaloneComponent } from './components/year-selector-standalone/year-selector-standalone.component';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [
    FileDownloadListComponent,
    ToolbarMenuButtonComponent,
    YearSelectorStandaloneComponent,
    InfoDialogComponent,
  ],
  declarations: [
    DeleteConfirmDialogComponent,
    FileDownloadListComponent,
    ToolbarMenuButtonComponent,
    YearSelectorComponent,
    YearSelectorStandaloneComponent,
    InfoDialogComponent,
  ],
})
export class SharedModule {}
