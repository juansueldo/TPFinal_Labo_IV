import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';


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
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
