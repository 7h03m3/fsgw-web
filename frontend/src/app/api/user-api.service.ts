import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../shared/dtos/user.dto';
import { JwtLoginInformation } from '../shared/dtos/jwt-login-information.dto';
import { UserPasswordChangeDto } from '../shared/dtos/user-password-change.dto';

@Injectable({
  providedIn: 'root',
})
export class UserApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('user');
  }

  public getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.url);
  }

  public getById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(this.url + '/' + id);
  }

  public create(dto: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.url, dto);
  }

  public update(dto: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(this.url, dto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public login(
    username: string,
    password: string
  ): Observable<JwtLoginInformation> {
    return this.http.post<JwtLoginInformation>(this.url + '/login', {
      username,
      password,
    });
  }

  public changePassword(dto: UserPasswordChangeDto): Observable<any> {
    return this.http.put<UserPasswordChangeDto>(this.url + '/password', dto);
  }
}
