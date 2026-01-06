import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  constructor(private api: ApiService) {}

  list(): Observable<any> {
    return this.api.get('/api/accounts');
  }

  create(payload: any): Observable<any> {
    return this.api.post('/api/accounts', payload);
  }
}
