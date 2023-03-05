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
import { AdminEventListComponent } from './components/admin-event-list/admin-event-list.component';
import { AdminEventDialogComponent } from './components/admin-event-list/components/admin-event-dialog/admin-event-dialog.component';

@NgModule({
  declarations: [AdminComponent, AdminUserListComponent, AdminUserDialogComponent, AdminEventCategoryListComponent, AdminEventCategoryDialogComponent, AdminLocationListComponent, AdminLocationDialogComponent, AdminEventListComponent, AdminEventDialogComponent],
  imports: [CommonModule, MaterialModule, AdminRoutingModule],
})
export class AdminModule {}
