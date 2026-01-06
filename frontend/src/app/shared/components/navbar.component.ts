import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/">Flujo de Dinero</a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" routerLink="/">Panel de Control</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/accounts">Cuentas</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/transactions">Movimientos</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/loans">Préstamos</a></li>
            <li class="nav-item"><a class="nav-link" routerLink="/analytics">Análisis</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {}
