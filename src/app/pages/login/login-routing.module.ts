import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardPacienteComponent } from '../dashboard-paciente/dashboard-paciente.component';
import { MisTurnosComponent } from '../mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from '../solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from '../mi-perfil/mi-perfil.component';
import { HistoriaComponent } from '../historia/historia.component';
import { SeccionUsuariosComponent } from '../seccion-usuarios/seccion-usuarios.component';
import {EstadisticasComponent} from '../estadisticas/estadisticas.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: "dashboard", component:DashboardComponent, 
},
{
  path: "dashboard-paciente", component: DashboardPacienteComponent
},
{
  path:"mis-turnos", component: MisTurnosComponent
},
{
  path: 'solicitar-turno', component: SolicitarTurnoComponent,data: { animation: 'isRight' }
},
{
  path: 'mi-perfil', component: MiPerfilComponent
},
{
  path: 'historia', component: HistoriaComponent
},
{
  path: "seccion-usuarios", component: SeccionUsuariosComponent,
},
{
  path: "estadisticas", component: EstadisticasComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
