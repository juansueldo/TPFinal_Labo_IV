import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PacientesDetalleComponent } from './pages/pacientes-detalle/pacientes-detalle.component';
import { EspecialistasDetalleComponent } from './pages/especialistas-detalle/especialistas-detalle.component';
import { DashboardPacienteComponent } from './pages/dashboard-paciente/dashboard-paciente.component';


const routes: Routes = [
  { 
    path: "", component:BienvenidaComponent, 
  },
  { path: "bienvenida", component:BienvenidaComponent, 
  },
  {
    path: "registro", loadChildren: () =>
    import('../app/pages/registro/registro.module').then(
      (m) => m.RegistroModule
    ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/pages/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  { path: "dashboard", component:DashboardComponent, 
  },
  {
    path: "dashboard-paciente", component: DashboardPacienteComponent
  },
  {
    path: "pacientes", component: PacientesDetalleComponent,
  },
  {
    path: "especialistas", component: EspecialistasDetalleComponent,
  },
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
