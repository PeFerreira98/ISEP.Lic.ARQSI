import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginComponent }       from './login/login.component';
import { ReceitasComponent }    from './receitas/receitas.component';
import { PrescricoesComponent } from './prescricoes/prescricoes.component'
import { AuthGuard }            from './guards/auth.guard';
import { MedicoGuard }          from './guards/medico.guard';
import { FarmaceuticoGuard }    from './guards/farmaceutico.guard';
import { UtenteGuard }          from './guards/utente.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'receitas', component: ReceitasComponent, canActivate:[AuthGuard, MedicoGuard] }
  { path: 'receitas', component: ReceitasComponent },
  { path: 'prescricoes', component: PrescricoesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }