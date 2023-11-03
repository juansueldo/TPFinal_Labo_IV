import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaEspecialistaComponent } from './alta-especialista/alta-especialista.component';
import { AltaPacienteComponent } from './alta-paciente/alta-paciente.component';
import { RegistroComponent } from './registro.component';
import { AltaAdminComponent } from './alta-admin/alta-admin.component';

const routes: Routes = [
  { path: '', component: RegistroComponent },
  {
    path:'alta-especialista', component: AltaEspecialistaComponent
  },
  {
    path:'alta-paciente', component: AltaPacienteComponent
  },
  {
    path:'alta-admin', component: AltaAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
