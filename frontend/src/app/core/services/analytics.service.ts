import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(private api: ApiService) {}

  getOverview(): Observable<any> {
    return this.api.get('/api/analytics/overview');
  }

  getSpending(): Observable<any> {
    return this.api.get('/api/analytics/spending');
  }
}
