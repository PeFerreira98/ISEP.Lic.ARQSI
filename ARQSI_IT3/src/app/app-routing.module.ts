import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ReceitasComponent } from './receitas/receitas.component';
import { PrescricoesComponent } from './prescricoes/prescricoes.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReceitasfarmaceuticoComponent } from './receitasfarmaceutico/receitasfarmaceutico.component';
import { ApresentacoesComponent } from './apresentacoes/apresentacoes.component';

import { AuthGuard } from './guards/auth.guard';
import { MedicoGuard } from './guards/medico.guard';
import { FarmaceuticoGuard } from './guards/farmaceutico.guard';
import { UtenteGuard } from './guards/utente.guard';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  //{ path: 'receitas', component: ReceitasComponent, canActivate:[AuthGuard, MedicoGuard] }
  { path: 'receitas', component: ReceitasComponent },
  { path: 'receitasfarmaceutico', component: ReceitasfarmaceuticoComponent },
  { path: 'prescricoes', component: PrescricoesComponent },
  { path: 'medicamentos', component: MedicamentosComponent }
  { path: 'apresentacoes', component: ApresentacoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }