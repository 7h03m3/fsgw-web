import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  private innerWidth = 0;
  private innerHeight = 0;

  constructor() {
    this.setSize(window.innerWidth, window.innerHeight);
  }

  public setSize(innerWidth: number, innerHeight: number) {
    this.innerWidth = innerWidth;
    this.innerHeight = innerHeight;
  }

  public isSmallScreen(): boolean {
    return this.innerWidth <= 600;
  }
}
