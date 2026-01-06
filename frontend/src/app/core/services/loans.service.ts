import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class LoansService {
  constructor(private api: ApiService) {}

  list(): Observable<any> {
    return this.api.get('/api/loans');
  }

  create(payload: any): Observable<any> {
    return this.api.post('/api/loans', payload);
  }

  schedule(id: string): Observable<any> {
    return this.api.get(`/api/loans/${id}/schedule`);
  }
}
