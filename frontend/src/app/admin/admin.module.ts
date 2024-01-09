import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { MaterialModule } from '../shared/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUserDialogComponent } from './components/admin-user-list/components/admin-user-dialog/admin-user-dialog.component';
import { AdminEventCategoryListComponent } from './components/admin-event-category-list/admin-event-category-list.component';
import { AdminEventCategoryDialogComponent } from './components/admin-event-category-list/components/admin-event-category-dialog/admin-event-category-dialog.component';
import { AdminLocationListComponent } from './components/admin-location-list/admin-location-list.component';
import { AdminLocationDialogComponent } from './components/admin-location-list/compontents/admin-location-dialog/admin-location-dialog.component';
import { AdminFileCategoryListComponent } from './components/admin-file-category-list/admin-file-category-list.component';
import { AdminFileCategoryDialogComponent } from './components/admin-file-category-list/components/admin-event-category-dialog/admin-file-category-dialog.component';
import { AdminNotifierListComponent } from './components/admin-notifier-list/admin-notifier-list.component';
import { AdminNotifierEditDialogComponent } from './components/admin-notifier-edit-dialog/admin-notifier-edit-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    AdminUserListComponent,
    AdminUserDialogComponent,
    AdminEventCategoryListComponent,
    AdminEventCategoryDialogComponent,
    AdminLocationListComponent,
    AdminLocationDialogComponent,
    AdminFileCategoryListComponent,
    AdminFileCategoryDialogComponent,
    AdminNotifierListComponent,
    AdminNotifierEditDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, AdminRoutingModule],
})
export class AdminModule {}
