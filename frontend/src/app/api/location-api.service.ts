import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationDto } from '../shared/dtos/location.dto';

@Injectable({
  providedIn: 'root',
})
export class LocationApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('location');
  }

  public getAll(): Observable<LocationDto[]> {
    return this.http.get<LocationDto[]>(this.url);
  }

  public create(dto: LocationDto): Observable<LocationDto> {
    return this.http.post<LocationDto>(this.url, dto);
  }

  public update(dto: LocationDto): Observable<LocationDto> {
    return this.http.put<LocationDto>(this.url, dto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
