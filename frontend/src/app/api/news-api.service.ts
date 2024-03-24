import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsDto } from '../shared/dtos/news.dto';
import { NewsCategory } from '../shared/enums/news-category.enum';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('news');
  }

  public getAll(): Observable<NewsDto[]> {
    return this.http.get<NewsDto[]>(this.url);
  }

  public getAllPublic(limit: number): Observable<NewsDto[]> {
    return this.http.get<NewsDto[]>(this.url + '/public/' + limit);
  }

  public getAllPublicByCategory(
    limit: number,
    category: NewsCategory
  ): Observable<NewsDto[]> {
    return this.http.get<NewsDto[]>(
      this.url + '/public/' + limit + '/' + category
    );
  }

  public create(dto: NewsDto): Observable<NewsDto> {
    return this.http.post<NewsDto>(this.url, dto);
  }

  public update(dto: NewsDto): Observable<NewsDto> {
    return this.http.put<NewsDto>(this.url, dto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
