import { BrowserModule }         from '@angular/platform-browser';
import { NgModule }              from '@angular/core';
import { FormsModule }           from '@angular/forms';
import { HttpClientModule }      from '@angular/common/http';

import { AppRoutingModule }      from './app-routing.module';
import { AppComponent }          from './app.component';

import { DashboardComponent }    from './dashboard/dashboard.component';
import { LoginComponent }        from './login/login.component';
import { ReceitasComponent }     from './receitas/receitas.component';
import { PrescricoesComponent }  from './prescricoes/prescricoes.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { SignUpComponent }       from './sign-up/sign-up.component';

import { ReceitasService }       from './receitas.service';
import { PrescricoesService }    from './prescricoes.service';
import { MedicamentosService }   from './medicamentos.service';
import { AuthenticationService } from './authentication.service';
import { SignUpService }         from './sign-up.service';

import { AuthGuard }             from './guards/auth.guard';
import { MedicoGuard }           from './guards/medico.guard';
import { FarmaceuticoGuard }     from './guards/farmaceutico.guard';
import { UtenteGuard }           from './guards/utente.guard';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    ReceitasComponent,
    PrescricoesComponent,
    MedicamentosComponent,
    SignUpComponent
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
    FarmaceuticoGuard,
    UtenteGuard,
    AuthenticationService,
    ReceitasService,
    PrescricoesService,
    MedicamentosService,
    SignUpService
   ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
