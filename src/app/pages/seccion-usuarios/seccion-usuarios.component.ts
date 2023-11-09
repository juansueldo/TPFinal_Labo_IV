import { Component } from '@angular/core';
import { Especialista, Registro } from 'src/app/models/especialista.models';
import { Paciente } from 'src/app/models/paciente.models';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss']
})
export class SeccionUsuariosComponent {
  selectPaciente!: Paciente | null;
  selectEspecialista!: Especialista | null;
  loading = false;
  user: any | null;
  mostrarPacientes: boolean = true;
  mostrarEspecialistas: boolean = false;

  constructor(private usuarioService: UsuariosService){}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.user = this.usuarioService.getUsuario();
  }

  selectedPaciente(event: Paciente) {
    console.log(event);
    if(this.user.tipo === 'paciente'){
      this.selectPaciente = this.user;
    }
    this.selectPaciente = event;
  }
  selectedEspecialista(event: Especialista) {
    console.log(event);
    if(this.user.tipo === 'especialista'){
      this.selectEspecialista = this.user;
    }
    this.selectEspecialista = event;
  }
  cambiarVista(vista: string) {
    if (vista === 'pacientes') {
      this.mostrarPacientes = true;
      this.mostrarEspecialistas = false;
    } else if (vista === 'especialistas') {
      this.mostrarPacientes = false;
      this.mostrarEspecialistas = true;
    }
  }
  mostrarRegistro(estado){
    let mostrar;
    if(estado == "1"){
      mostrar = "Aprobado";
    }
    else if(estado == "2"){
      mostrar = "Rechazado";
    }
    else{
      mostrar = "Pendiente";
    }
    return mostrar;
  }
}
