
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

  setTipoRegistro$(value:string){
    this.tipoRegistro$.next(value);
  }

  getTipoRegistro$(): Observable<string> {
    return this.tipoRegistro$;
  }

  setEstaLogueado$(value:boolean){
    this.estaLogueado$.next(value);
    this.usuarioLogueado = value;
  }

  getEstaLogueado$(): Observable<boolean> {
    return this.estaLogueado$;
  }

  setEspecialistas$(value:Especialista[]){
    this.especialistas$.next(value);
  }

  getEspecialistas$(): Observable<Especialista[]> {
    return this.especialistas$;
  }

  setPacientes$(value:Paciente[]){
    this.pacientes$.next(value);
  }

  getPacientes$(): Observable<Paciente[]> {
    return this.pacientes$;
  }

  registrarUsuario(tipoUsuario:string, usuario:any){    
    if(tipoUsuario == "paciente"){
      this.pacienteService.agregarPaciente(usuario);
    }
    else if(tipoUsuario == "especialista"){
      this.especialistaService.agregarEspecialista(usuario);
    }
    else{
      this.adminService.agregarAdmin(usuario);
    }
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

  estaUsuarioEnBaseDeDatos(email:string){
    let retorno = false;
    this.pacientes.forEach(paciente => {
      if(paciente.email == email){
        retorno = true;
      }
    });
    this.especialistas.forEach(especialista => {
      if(especialista.email == email){
        retorno = true;
      }
    });
    this.admins.forEach(admin => {
      if(admin.email == email){
        retorno = true;
      }
    });
    return retorno;
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
