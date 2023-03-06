import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-welcome',
  templateUrl: './public-welcome.component.html',
  styleUrls: ['./public-welcome.component.css'],
})
export class PublicWelcomeComponent {
  constructor(private router: Router) {}

  public onEventSelect(category: string | undefined) {
    if (category) {
      this.router.navigate(['/public/event-list', { category: category }]);
    } else {
      this.router.navigate(['/public/event-list']);
    }
  }
}
