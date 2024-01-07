import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private readonly userSettingsPrefix = 'userSettings_';
  private readonly eventCategoryKey = this.userSettingsPrefix + 'eventCategory';
  private readonly locationKey = this.userSettingsPrefix + 'location';
  private readonly currentYearKey = 'currentYear';

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

  public getCurrentYear(): number {
    const yearString = sessionStorage.getItem(this.currentYearKey);
    if (yearString == null) {
      const date = new Date(Date.now());
      this.setCurrentYear(date.getFullYear());
      return date.getFullYear();
    }

    return parseInt(yearString);
  }

  public setCurrentYear(newSelectYear: number) {
    sessionStorage.setItem(this.currentYearKey, newSelectYear.toString());
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
