import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from './base-api';
import { FileCategoryDto } from '../shared/dtos/file-category.dto';

@Injectable({
  providedIn: 'root',
})
export class FileCategoryApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('file-category');
  }

  public getAll(): Observable<FileCategoryDto[]> {
    return this.http.get<FileCategoryDto[]>(this.url);
  }

  public getByAbbreviation(abbreviation: string): Observable<FileCategoryDto> {
    return this.http.get<FileCategoryDto>(this.url + '/' + abbreviation);
  }

  public create(dto: FileCategoryDto): Observable<FileCategoryDto> {
    return this.http.post<FileCategoryDto>(this.url, dto);
  }

  public update(dto: FileCategoryDto): Observable<FileCategoryDto> {
    return this.http.put<FileCategoryDto>(this.url, dto);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }
}
