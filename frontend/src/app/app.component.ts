import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'FSGW';

  constructor(public authService: AuthService, private router: Router) {}

  public onEventSelect(category: string | undefined) {
    if (category) {
      this.router.navigate(['/public/event-list', { category: category }]);
    } else {
      this.router.navigate(['/public/event-list']);
    }
  }
}
