import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDto } from '../shared/dtos/event.dto';

@Injectable({
  providedIn: 'root',
})
export class EventApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('event');
  }

  public getAll(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.url);
  }

  public getAllPublic(startDate: number): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(this.url + '/public/' + startDate);
  }

  public getAllPublicByCategory(
    startDate: number,
    categoryAbbreviation: string
  ): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(
      this.url + '/public/' + startDate + '/' + categoryAbbreviation
    );
  }

  public create(dto: EventDto): Observable<EventDto> {
    return this.http.post<EventDto>(this.url, dto);
  }

  public update(dto: EventDto): Observable<EventDto> {
    return this.http.put<EventDto>(this.url, dto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
