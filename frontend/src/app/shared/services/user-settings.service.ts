import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private readonly userSettingsPrefix = 'userSettings_';
  private readonly eventCategoryKey = this.userSettingsPrefix + 'eventCategory';
  private readonly locationKey = this.userSettingsPrefix + 'location';

  constructor() {}

  public setEventCategory(categoryId: number) {
    localStorage.setItem(this.eventCategoryKey, categoryId.toString());
  }

  public getEventCategory(): number {
    const value = localStorage.getItem(this.eventCategoryKey);
    if (!value) {
      return 0;
    }

    return parseInt(value);
  }

  public setLocation(locationId: number) {
    localStorage.setItem(this.locationKey, locationId.toString());
  }

  public getLocation(): number {
    const value = localStorage.getItem(this.locationKey);
    if (!value) {
      return 0;
    }

    return parseInt(value);
  }
}
