import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingDto } from '../shared/dtos/setting.dto';
import { BaseApi } from './base-api';
import { SettingType } from '../shared/enums/setting-type.enum';

@Injectable({
  providedIn: 'root',
})
export class SettingsApiService extends BaseApi {
  constructor(private http: HttpClient) {
    super('settings');
  }

  public getAll(): Observable<SettingDto[]> {
    return this.http.get<SettingDto[]>(this.url);
  }

  public getByType(type: SettingType): Observable<SettingDto> {
    return this.http.get<SettingDto>(this.url + '/' + type);
  }

  public update(dto: SettingDto): Observable<SettingDto> {
    return this.http.put<SettingDto>(this.url, dto);
  }
}
