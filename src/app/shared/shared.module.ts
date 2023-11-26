import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomInputComponent } from '../components/custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import { ListadoEspecialistasComponent } from '../components/listado-especialistas/listado-especialistas.component';
import { ListadoPacientesComponent } from '../components/listado-pacientes/listado-pacientes.component';
import { CardPacienteComponent } from '../components/card-paciente/card-paciente.component';
import { CardEspecialistaComponent } from '../components/card-especialista/card-especialista.component';


@NgModule({
  declarations: [
    CustomInputComponent,
    CardPacienteComponent,
    ListadoEspecialistasComponent,
    ListadoPacientesComponent,
    CardEspecialistaComponent,
    
  ],
  exports: [
    CustomInputComponent,
    CardPacienteComponent,
    CardEspecialistaComponent,
    ListadoEspecialistasComponent,
    ListadoPacientesComponent,
    
  ],
  providers:[],
  imports: [ReactiveFormsModule,CommonModule,FormsModule,MatButtonModule],
})
export class SharedModule { }