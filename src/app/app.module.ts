import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from './environments/environments';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';

import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms'; 
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectEspecialidadComponent } from './components/select-especialidad/select-especialidad.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';;
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AltaPacienteComponent } from './pages/registro/alta-paciente/alta-paciente.component';
import { AltaEspecialistaComponent } from './pages/registro/alta-especialista/alta-especialista.component';
import { AltaAdminComponent } from './pages/registro/alta-admin/alta-admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { FormAltaComponent } from './components/form-alta/form-alta.component';
import { DashboardPacienteComponent } from './pages/dashboard-paciente/dashboard-paciente.component';
import { FiltrarTurnosPipe } from './pipes/filtrar-turnos.pipe';
import { SeccionUsuariosComponent } from './pages/seccion-usuarios/seccion-usuarios.component';
import { MisTurnosComponent } from './pages/mis-turnos/mis-turnos.component';
import { SolicitarTurnoComponent } from './pages/solicitar-turno/solicitar-turno.component';
import {BsDropdownConfig  } from 'ngx-bootstrap/dropdown';
import { BsDropdownModule  } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MiPerfilComponent } from './pages/mi-perfil/mi-perfil.component';
import { DiaStringPipe } from './pipes/dia-string.pipe';
import { HistoriaComponent } from './pages/historia/historia.component';
import { MiVentanaModalComponent } from './components/mi-ventana-modal/mi-ventana-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    LoginComponent,
    BienvenidaComponent,
    RegistroComponent,
    SelectEspecialidadComponent,
    AltaPacienteComponent,
    AltaEspecialistaComponent,
    DashboardComponent,
    AltaAdminComponent,
    NavbarComponent,
    NotFoundComponent,
    CaptchaComponent,
    FormAltaComponent,
    DashboardPacienteComponent,
    FiltrarTurnosPipe,
    SeccionUsuariosComponent,
    MisTurnosComponent,
    SolicitarTurnoComponent,
    MiPerfilComponent,
    DiaStringPipe,
    HistoriaComponent,
    MiVentanaModalComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    FormsModule,
    NgxCaptchaModule,
    HttpClientModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    MatDialogModule
  ],
  providers: [BsDropdownConfig,{ provide: FIREBASE_OPTIONS, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule { }