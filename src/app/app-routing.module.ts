import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardPacienteComponent } from './pages/dashboard-paciente/dashboard-paciente.component';
import { SeccionUsuariosComponent } from './pages/seccion-usuarios/seccion-usuarios.component';

import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { HistoriaComponent } from './pages/historia/historia.component';


const routes: Routes = [
  { 
    path: "", component:BienvenidaComponent, 
  },
  { path: "bienvenida", component:BienvenidaComponent, data: { animation: 'fade' }
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
      )
  },
 
  { path: '**', component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
