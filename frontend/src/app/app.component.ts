import { Component, HostListener } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { WindowService } from './shared/services/window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FSGW';

  constructor(
    public authService: AuthService,
    private router: Router,
    public windowService: WindowService
  ) {}

  @HostListener('window:resize', ['$event'])
  public onWindowResize() {
    this.windowService.setSize(window.innerWidth, window.innerHeight);
  }

  public isFirstToolbarRowVisible() {
    return !this.windowService.isSmallScreen();
  }
}
