import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../core/services/transactions.service';
import { AccountsService } from '../../core/services/accounts.service';

@Component({
  selector: 'app-transactions',
  template: `
    <h1>Movimientos</h1>
    
    <div class="card mb-4">
      <div class="card-header">Agregar Nuevo Movimiento</div>
      <div class="card-body">
        <form (ngSubmit)="addTransaction()">
          <div class="mb-3">
            <label class="form-label">Tipo</label>
            <select class="form-select" [(ngModel)]="newTransaction.type" name="type" required>
              <option value="">Seleccionar Tipo</option>
              <option value="income">Ingreso</option>
              <option value="expense">Gasto</option>
              <option value="transfer">Transferencia</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Cantidad</label>
            <input type="number" class="form-control" [(ngModel)]="newTransaction.amount" name="amount" step="0.01" required>
          </div>

          <div class="mb-3" *ngIf="newTransaction.type !== 'transfer'">
            <label class="form-label">Cuenta</label>
            <select class="form-select" [(ngModel)]="newTransaction.account_id" name="account_id" required>
              <option value="">Seleccionar Cuenta</option>
              <option *ngFor="let a of accounts" [value]="a.id">{{ a.name }}</option>
            </select>
          </div>

          <div *ngIf="newTransaction.type === 'transfer'">
            <div class="mb-3">
              <label class="form-label">Desde</label>
              <select class="form-select" [(ngModel)]="newTransaction.from_account_id" name="from_account_id" required>
                <option value="">Seleccionar Cuenta</option>
                <option *ngFor="let a of accounts" [value]="a.id">{{ a.name }}</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Hacia</label>
              <select class="form-select" [(ngModel)]="newTransaction.to_account_id" name="to_account_id" required>
                <option value="">Seleccionar Cuenta</option>
                <option *ngFor="let a of accounts" [value]="a.id">{{ a.name }}</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Categoría</label>
            <input type="text" class="form-control" [(ngModel)]="newTransaction.category" name="category" placeholder="ej. Abarrotes, Salario">
          </div>

          <div class="mb-3">
            <label class="form-label">Notas</label>
            <textarea class="form-control" [(ngModel)]="newTransaction.notes" name="notes" rows="2"></textarea>
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="loading">
            {{ loading ? 'Agregando...' : 'Agregar Movimiento' }}
          </button>
          <span *ngIf="error" class="text-danger ms-2">{{ error }}</span>
        </form>
      </div>
    </div>

    <h3>Movimientos Recientes</h3>
    <div class="list-group">
      <div class="list-group-item" *ngFor="let t of transactions">
        <strong>{{ t.type === 'income' ? 'Ingreso' : (t.type === 'expense' ? 'Gasto' : 'Transferencia') }}</strong>
        <span class="badge bg-secondary ms-2">{{ t.category || 'Sin categoría' }}</span>
        <span class="float-end">{{ t.amount | currency }}</span>
        <div class="small text-muted">{{ t.notes }}</div>
      </div>
    </div>
  `,
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  accounts: any[] = [];
  newTransaction = {
    type: '',
    amount: 0,
    account_id: '',
    from_account_id: '',
    to_account_id: '',
    category: '',
    notes: '',
  };
  loading = false;
  error = '';

  constructor(
    private tx: TransactionsService,
    private accountsService: AccountsService
  ) {}

  ngOnInit() {
    this.loadTransactions();
    this.loadAccounts();
  }

  loadTransactions() {
    this.tx.list().subscribe((list) => (this.transactions = list));
  }

  loadAccounts() {
    this.accountsService.list().subscribe((list) => (this.accounts = list));
  }

  addTransaction() {
    if (!this.newTransaction.type || !this.newTransaction.amount) {
      this.error = 'El tipo y la cantidad son obligatorios';
      return;
    }

    if (
      this.newTransaction.type !== 'transfer' &&
      !this.newTransaction.account_id
    ) {
      this.error = 'Por favor selecciona una cuenta';
      return;
    }

    if (
      this.newTransaction.type === 'transfer' &&
      (!this.newTransaction.from_account_id ||
        !this.newTransaction.to_account_id)
    ) {
      this.error = 'Por favor selecciona ambas cuentas para la transferencia';
      return;
    }

    this.loading = true;
    this.error = '';

    this.tx.create(this.newTransaction).subscribe({
      next: () => {
        this.newTransaction = {
          type: '',
          amount: 0,
          account_id: '',
          from_account_id: '',
          to_account_id: '',
          category: '',
          notes: '',
        };
        this.loading = false;
        this.loadTransactions();
        this.loadAccounts();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al agregar el movimiento';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
