import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuard }             from './guards/auth.guard';
import { MedicoGuard }           from './guards/medico.guard';
import { UtenteGuard }           from './guards/utente.guard';
import { ReceitasComponent } from './receitas/receitas.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ReceitasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    MedicoGuard,
    UtenteGuard,
    AuthenticationService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
