import { Injectable } from '@angular/core';
import { BaseApi } from './base-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileDto } from '../shared/dtos/file.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('file');
  }

  public getAll(): Observable<FileDto[]> {
    return this.http.get<FileDto[]>(this.url);
  }

  public getByFilename(filename: string): Observable<FileDto> {
    return this.http.get<FileDto>(this.url + '/filename/' + filename);
  }

  public getByCategory(categoryAbbreviation: string): Observable<FileDto[]> {
    return this.http.get<FileDto[]>(
      this.url + '/category/' + categoryAbbreviation
    );
  }

  public getByCategoryAndYear(
    categoryAbbreviation: string,
    year: number
  ): Observable<FileDto[]> {
    return this.http.get<FileDto[]>(
      this.url + '/category/' + categoryAbbreviation + '/' + year
    );
  }

  public update(dto: FileDto): Observable<FileDto> {
    return this.http.put<FileDto>(this.url, dto);
  }

  public upload(file: File, dto: FileDto) {
    const formData = new FormData();

    formData.append('dto', JSON.stringify(dto));
    formData.append('file', file);

    return this.http.post(this.url + '/upload', formData);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public download(file: FileDto): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', file.mimetype);
    return this.http.get(this.url + '/' + file.id, {
      observe: 'response',
      headers: headers,
      responseType: 'blob',
    });
  }
}
