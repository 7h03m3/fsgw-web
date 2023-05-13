import { NgModule } from '@angular/core';
import { FileDownloadListComponent } from './components/file-download-list/file-download-list.component';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ToolbarMenuButtonComponent } from './components/toolbar-menu-button/toolbar-menu-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [FileDownloadListComponent, ToolbarMenuButtonComponent],
  declarations: [
    DeleteConfirmDialogComponent,
    FileDownloadListComponent,
    ToolbarMenuButtonComponent,
  ],
})
export class SharedModule {}
