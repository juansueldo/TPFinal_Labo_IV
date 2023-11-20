import { Component } from '@angular/core';
import { Especialista, Registro } from 'src/app/models/especialista.models';
import { Paciente } from 'src/app/models/paciente.models';
import { Turno } from 'src/app/models/turno.models';
import { DataService } from 'src/app/services/data.service';
import { PacienteService } from 'src/app/services/paciente.service';
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
  turnos:Turno[] = [];
  pacientes;
  pacientesEspecialista: Paciente[]=[];
  constructor(private usuarioService: UsuariosService, private data: DataService, private pacienteService: PacienteService ){}

  ngOnInit(): void {
    this.cargarUsuario();
    this.cargarPacientesEspecialista();   
  }

  cargarUsuario() {
    this.user = this.usuarioService.getUsuario();
  }
  cargarPacientesEspecialista() {
    this.data.getTurnosDB().subscribe(turnos => {
      turnos.forEach(turno=>{
        if(turno.especialista === this.user.email){
          this.pacienteService.obtenerPacientes().subscribe(pacientes=>{
            pacientes.forEach(paciente=>{
              if(turno.paciente === paciente.email){
                this.pacientesEspecialista.push(paciente);
                console.log(turnos);
              }
            })
           
          })
        }
      });
      
    });
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
