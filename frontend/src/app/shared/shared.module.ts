import { NgModule } from '@angular/core';
import { FileDownloadListComponent } from './components/file-download-list/file-download-list.component';
import { DeleteConfirmDialogComponent } from './components/delete-confirm-dialog/delete-confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [FileDownloadListComponent],
  declarations: [DeleteConfirmDialogComponent, FileDownloadListComponent],
})
export class SharedModule {}
