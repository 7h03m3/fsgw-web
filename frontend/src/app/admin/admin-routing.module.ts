import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminEventCategoryListComponent } from './components/admin-event-category-list/admin-event-category-list.component';
import { AdminLocationListComponent } from './components/admin-location-list/admin-location-list.component';
import { AdminEventListComponent } from './components/admin-event-list/admin-event-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminUserListComponent,
      },
      {
        path: 'user-list',
        component: AdminUserListComponent,
      },
      {
        path: 'event-category-list',
        component: AdminEventCategoryListComponent,
      },
      {
        path: 'location-list',
        component: AdminLocationListComponent,
      },
      {
        path: 'event-list',
        component: AdminEventListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
