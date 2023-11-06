import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { DashboardAdminComponent } from '../components/dashboard-admin/dashboard-admin.component';
import { ListadoEspecialistasComponent } from '../components/listado-especialistas/listado-especialistas.component';
import { ListadoPacientesComponent } from '../components/listado-pacientes/listado-pacientes.component';
import { DetalleEspecialistaComponent } from '../components/detalle-especialista/detalle-especialista.component';


@NgModule({
  declarations: [
    CustomInputComponent,
    NavbarComponent,
    DashboardAdminComponent,
    ListadoEspecialistasComponent,
    ListadoPacientesComponent,
    DetalleEspecialistaComponent
  ],
  exports: [
    CustomInputComponent,
    NavbarComponent,
    DashboardAdminComponent,
    ListadoEspecialistasComponent,
    ListadoPacientesComponent,
    DetalleEspecialistaComponent
  ],
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
})
export class SharedModule { }
