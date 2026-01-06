import { Component, OnInit } from '@angular/core';
import { LoansService } from '../../core/services/loans.service';

@Component({
  template: `
    <h1>Préstamos</h1>
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let l of loans">{{ l.name }} — Pago Mensual: {{ l.monthly_payment | currency }}</li>
    </ul>
  `,
})
export class LoansComponent implements OnInit {
  loans: any[] = [];
  constructor(private loansService: LoansService) {}
  ngOnInit() {
    this.loansService.list().subscribe((list) => (this.loans = list));
  }
}
