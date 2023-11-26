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
  ultimosTurnos:Turno[] = [];
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
      turnos.forEach(turno => {
        if (turno.especialista === this.user.email) {
          this.pacienteService.obtenerPacientes().subscribe(pacientes => {
            pacientes.forEach(paciente => {
              const pacienteYaExiste = this.pacientesEspecialista.some(p => p.email === paciente.email);
  
              if (!pacienteYaExiste && turno.paciente === paciente.email) {
                const ultimosTurnos = this.obtenerUltimosTresTurnos(paciente.email, turnos);
                
                
                // Agregar la propiedad ultimosTurnos al objeto Paciente
                const pacienteConUltimosTurnos = {
                  ...paciente,
                  ultimosTurnos: ultimosTurnos,
                };
  
                this.pacientesEspecialista.push(pacienteConUltimosTurnos);
                console.log(turnos);
                console.log(ultimosTurnos);
              }
            });
          });
        }
      });
    });
  }
  
  
  obtenerUltimosTresTurnos(pacienteEmail: string, turnos: any[]): any[] {
    const ultimosTurnos = turnos
      .filter(turno => turno.paciente === pacienteEmail)
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, 3);
  
    return ultimosTurnos.map(turno => ({ fecha: turno.fecha }));
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
