import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginEspecialistaComponent } from './login-especialista/login-especialista.component';
import { LoginPacienteComponent } from './login-paciente/login-paciente.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'login-especialista', component: LoginEspecialistaComponent},
  {path: 'login-paciente', component: LoginPacienteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
