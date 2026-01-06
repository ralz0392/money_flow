import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../core/services/accounts.service';

@Component({
  selector: 'app-accounts',
  template: `
    <h1>Cuentas</h1>
    
    <div class="card mb-4">
      <div class="card-header">Agregar Nueva Cuenta</div>
      <div class="card-body">
        <form (ngSubmit)="addAccount()">
          <div class="mb-3">
            <label class="form-label">Nombre de la Cuenta</label>
            <input type="text" class="form-control" [(ngModel)]="newAccount.name" name="name" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Tipo</label>
            <select class="form-select" [(ngModel)]="newAccount.type" name="type" required>
              <option value="">Seleccionar Tipo</option>
              <option value="debit">Débito</option>
              <option value="credit">Crédito</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Saldo Inicial</label>
            <input type="number" class="form-control" [(ngModel)]="newAccount.balance" name="balance" step="0.01">
          </div>
          <button type="submit" class="btn btn-primary" [disabled]="loading">
            {{ loading ? 'Creando...' : 'Crear Cuenta' }}
          </button>
          <span *ngIf="error" class="text-danger ms-2">{{ error }}</span>
        </form>
      </div>
    </div>

    <h3>Tus Cuentas</h3>
    <div class="list-group">
      <div class="list-group-item" *ngFor="let a of accounts">
        <strong>{{ a.name }}</strong>
        <span class="badge bg-secondary ms-2">{{ a.type === 'debit' ? 'Débito' : 'Crédito' }}</span>
        <span class="float-end">{{ a.balance | currency }}</span>
      </div>
    </div>
  `,
})
export class AccountsComponent implements OnInit {
  accounts: any[] = [];
  newAccount = { name: '', type: '', balance: 0 };
  loading = false;
  error = '';

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountsService.list().subscribe((list) => (this.accounts = list));
  }

  addAccount() {
    if (!this.newAccount.name || !this.newAccount.type) {
      this.error = 'El nombre y el tipo son obligatorios';
      return;
    }
    this.loading = true;
    this.error = '';
    this.accountsService.create(this.newAccount).subscribe({
      next: () => {
        this.newAccount = { name: '', type: '', balance: 0 };
        this.loading = false;
        this.loadAccounts();
      },
      error: (err) => {
        this.error = 'Error al crear la cuenta';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
