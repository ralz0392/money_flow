import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  template: `
    <h1>Panel de Control</h1>
    <p *ngIf="overview">Activos: {{ overview.assets | currency }} — Pasivos: {{ overview.liabilities | currency }} — Patrimonio: {{ overview.net_worth | currency }}</p>
  `,
})
export class DashboardComponent implements OnInit {
  overview: any;
  constructor(private analytics: AnalyticsService) {}

  ngOnInit() {
    this.analytics.getOverview().subscribe((v) => (this.overview = v));
  }
}
