
import { Injectable } from '@angular/core';
import { PacienteService } from './paciente.service';
import { EspecialistasService } from './especialistas.service';
import { AdminService } from './admin.service';
import { Observable, Subject } from 'rxjs';
import { Especialista } from '../models/especialista.models';
import { Paciente } from '../models/paciente.models';
import { Admin } from '../models/admin.models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  usuarioLogueado = false;
  estaLogueado$ : Subject<boolean>;
  tipoUsuario = "";
  pacientes:Paciente[];
  especialistas$ : Subject<Especialista[]>;
  pacientes$ : Subject<Paciente[]>;
  especialistas:Especialista[];
  admins:Admin[];
  tipoRegistro$:Subject<string>;

  constructor(
    private pacienteService:PacienteService,
    private especialistaService:EspecialistasService,
    private adminService: AdminService) {
    this.estaLogueado$ = new Subject();
    this.estaLogueado$.next(false);
    this.especialistas$ = new Subject();
    this.pacientes$ = new Subject();
    this.tipoRegistro$ = new Subject();
    this.tipoRegistro$.next("");
    
    this.pacienteService.obtenerPacientes().subscribe(pacientes => {
      this.pacientes = pacientes;
      this.pacientes$.next(pacientes);
    });
    this.adminService.obtenerAdmins().subscribe(admins => {
      this.admins = admins;
    });
    this.especialistaService.obtenerEspecialistas().subscribe(especialistas => {
      this.especialistas = especialistas;
      this.especialistas$.next(especialistas);
    });
  }

  
  
  buscarUsuarioPorMail(email:string){
    let usuario = null;    
    this.pacientes.forEach(paciente => {
      if(paciente.email == email){
        usuario = paciente as Paciente;
      }
    });
    this.especialistas.forEach(especialista => {
      if(especialista.email == email){
        usuario = especialista as Especialista;
      }
    });
    this.admins.forEach(admin => {
      if(admin.email == email){
        usuario = admin as Admin;
      }
    });
    return usuario;
  }


  setUsuario(tipoUsuario:string, usuario:any){
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.tipoUsuario = tipoUsuario;
    this.usuarioLogueado = true;
  }

  getUsuario(){
    return JSON.parse(localStorage.getItem('usuario'))
  }

  desloguearUsuario(){
    localStorage.removeItem('usuario');
    this.usuarioLogueado = false;
    this.tipoUsuario = "";
  }
}
