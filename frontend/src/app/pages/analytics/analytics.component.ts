import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics.service';

@Component({
  template: `
    <h1>Análisis</h1>
    <pre>{{ spending | json }}</pre>
  `,
})
export class AnalyticsComponent implements OnInit {
  spending: any;
  constructor(private analytics: AnalyticsService) {}
  ngOnInit() {
    this.analytics.getSpending().subscribe((s) => (this.spending = s));
  }
}
