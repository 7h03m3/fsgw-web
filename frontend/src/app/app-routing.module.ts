import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from './auth/role-guard.service';
import { UserRole } from './shared/enums/user-role.enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'public',
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    canActivate: [RoleGuardService],
    data: {
      expectedRole: UserRole.Admin,
    },
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'content-manager',
    canActivate: [RoleGuardService],
    data: {
      expectedRole: UserRole.ContentManager,
    },
    loadChildren: () =>
      import('./content-manager/content-manager.module').then(
        (m) => m.ContentManagerModule
      ),
  },
  {
    path: 'contact-message',
    loadChildren: () =>
      import('./contact-messages/contact-message.module').then(
        (m) => m.ContactMessageModule
      ),
    canActivate: [RoleGuardService],
    data: {
      expectedRole: UserRole.ContentManager,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
