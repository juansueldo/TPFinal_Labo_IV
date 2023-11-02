import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AltaEspecialistaComponent } from './pages/registro/alta-especialista/alta-especialista.component';
import { AltaPacienteComponent } from './pages/registro/alta-paciente/alta-paciente.component';

const routes: Routes = [
  { 
    path: "", component:BienvenidaComponent, 
  },
  { path: "bienvenida", component:BienvenidaComponent, 
  },
  {
    path: "registro", component: RegistroComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/pages/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path:'alta-especialista', component: AltaEspecialistaComponent
  },
  {
    path:'alta-paciente', component: AltaPacienteComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
