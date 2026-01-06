import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { LoansComponent } from './pages/loans/loans.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { NavbarComponent } from './shared/components/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AccountsComponent,
    TransactionsComponent,
    LoansComponent,
    AnalyticsComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
