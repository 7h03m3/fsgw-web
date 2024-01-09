import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationDto } from '../shared/dtos/registration.dto';

@Injectable({
  providedIn: 'root',
})
export class RegistrationApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('registration');
  }

  public getAllByYear(year: number): Observable<RegistrationDto[]> {
    return this.http.get<RegistrationDto[]>(this.url + '/' + year);
  }

  public create(dto: RegistrationDto): Observable<RegistrationDto> {
    return this.http.post<RegistrationDto>(this.url, dto);
  }

  public update(dto: RegistrationDto): Observable<RegistrationDto> {
    return this.http.put<RegistrationDto>(this.url, dto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public getRegistrationReport(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', '*/*');
    return this.http.get(this.url + '/report/' + id, {
      observe: 'response',
      headers: headers,
      responseType: 'blob',
    });
  }
}
