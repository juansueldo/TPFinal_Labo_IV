import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginPacienteComponent } from './login-paciente/login-paciente.component';
import { LoginEspecialistaComponent } from './login-especialista/login-especialista.component';
//import { CustomInputComponent } from 'src/app/components/custom-input/custom-input.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    LoginPacienteComponent,
    LoginEspecialistaComponent,
    //CustomInputComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
