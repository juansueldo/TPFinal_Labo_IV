import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SpinnerComponent } from './components/spinner/spinner.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from './environments/environments';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';

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
import { PacientesDetalleComponent } from './pages/pacientes-detalle/pacientes-detalle.component';
import { EspecialistasDetalleComponent } from './pages/especialistas-detalle/especialistas-detalle.component';
import { TurnosPacienteComponent } from './pages/turnos-paciente/turnos-paciente.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { FormAltaComponent } from './components/form-alta/form-alta.component';

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
    PacientesDetalleComponent,
    EspecialistasDetalleComponent,
    TurnosPacienteComponent,
    CaptchaComponent,
    FormAltaComponent,
    

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
    HttpClientModule
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
