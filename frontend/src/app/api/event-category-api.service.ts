import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventCategoryDto } from '../shared/dtos/event-category.dto';

@Injectable({
  providedIn: 'root',
})
export class EventCategoryApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('event-category');
  }

  public getAll(): Observable<EventCategoryDto[]> {
    return this.http.get<EventCategoryDto[]>(this.url);
  }

  public getByAbbreviation(abbreviation: string): Observable<EventCategoryDto> {
    return this.http.get<EventCategoryDto>(this.url + '/' + abbreviation);
  }

  public create(dto: EventCategoryDto): Observable<EventCategoryDto> {
    return this.http.post<EventCategoryDto>(this.url, dto);
  }

  public update(dto: EventCategoryDto): Observable<EventCategoryDto> {
    return this.http.put<EventCategoryDto>(this.url, dto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
