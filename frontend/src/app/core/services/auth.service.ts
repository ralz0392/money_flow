import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private api: ApiService) {}

  login(username: string, password: string) {
    return this.api.post('/api/auth/token', { username, password }).pipe(
      tap((res: any) => {
        if (res.token) localStorage.setItem('token', res.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  get token() {
    return localStorage.getItem('token');
  }
}
