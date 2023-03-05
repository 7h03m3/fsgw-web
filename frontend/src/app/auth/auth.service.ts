import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserApiService } from '../api/user-api.service';
import { JwtLoginInformation } from '../shared/dtos/jwt-login-information.dto';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { UserRole } from '../shared/enums/user-role.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly accessTokenKey = 'accessToken';
  private readonly userIdKey = 'userId';
  private readonly userRolesKey = 'userRoles';

  constructor(
    private userApi: UserApiService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  public login(
    username: string,
    password: string
  ): Observable<JwtLoginInformation> {
    return this.userApi.login(username, password).pipe(
      map((result) => {
        this.setSession(result);
        this.router.navigateByUrl('/');
        return result;
      }),
      catchError(() => {
        this.logout();
        return EMPTY;
      })
    );
  }

  public logout() {
    this.destroySession();
    this.router.navigateByUrl('/user/login');
  }

  public isLoggedIn() {
    const accessToken = this.getUserAccessToken();
    if (accessToken) {
      return !this.jwtHelper.isTokenExpired(accessToken);
    }

    return false;
  }

  public getUserAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  public isAdmin(): boolean {
    return this.haseUserRole(UserRole.Admin);
  }

  public haseUserRole(role: UserRole): boolean {
    if (!this.isLoggedIn()) {
      return false;
    }

    return this.getUserRoles().includes(role);
  }

  public getUserRoles(): UserRole[] {
    const roles = localStorage.getItem(this.userRolesKey);
    if (roles == null) {
      return [];
    }

    return JSON.parse(roles);
  }

  private destroySession() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.userRolesKey);
  }

  private setSession(loginInformation: JwtLoginInformation) {
    localStorage.setItem(this.accessTokenKey, loginInformation.access_token);
    localStorage.setItem(this.userIdKey, loginInformation.id.toString());
    localStorage.setItem(
      this.userRolesKey,
      JSON.stringify(loginInformation.roles)
    );
  }
}
