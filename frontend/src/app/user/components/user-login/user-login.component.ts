import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  public loginValid = true;
  public username = '';
  public password = '';

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}

  public async onSubmit() {
    this.loginValid = true;
    this.authService.login(this.username, this.password).subscribe({
      complete: () => {
        if (this.authService.isLoggedIn() == false) {
          this.loginValid = false;
        }
      },
    });
  }
}
