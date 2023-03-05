import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserRole } from '../shared/enums/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];

    const userRoles = this.authService.getUserRoles();

    if (expectedRole && this.authService.isLoggedIn()) {
      if (userRoles.includes(UserRole.Admin)) {
        return true;
      }

      const multipleRoles = expectedRole instanceof Array;
      if (multipleRoles) {
        const result = expectedRole.find((role) => userRoles.includes(role));
        if (result != undefined) {
          return true;
        }
      } else if (userRoles.includes(expectedRole)) {
        return true;
      }
    }

    this.router.navigate(['/user/login']);
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!childRoute.parent) {
      return false;
    }
    return this.canActivate(childRoute.parent);
  }
}
