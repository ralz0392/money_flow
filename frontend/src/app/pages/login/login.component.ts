import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-4">
          <h2>Money Flow Login</h2>
          <form (ngSubmit)="login()">
            <div class="form-group mb-3">
              <label>Username:</label>
              <input type="text" class="form-control" [(ngModel)]="username" name="username" />
            </div>
            <div class="form-group mb-3">
              <label>Password:</label>
              <input type="password" class="form-control" [(ngModel)]="password" name="password" />
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
            <p *ngIf="error" class="text-danger mt-3">{{ error }}</p>
            <p *ngIf="loading" class="text-info mt-3">Logging in...</p>
          </form>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  username = 'admin';
  password = 'password';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {
    if (this.auth.token) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = 'Invalid credentials';
        this.loading = false;
      },
    });
  }
}
