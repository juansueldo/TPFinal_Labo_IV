import { Component, EventEmitter, Output } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.models';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent {
  pacientes : Array<Paciente> = [];
  @Output() selectedPacienteEvent = new EventEmitter<Paciente>();

  constructor(private pacienteService : PacienteService) {
  }
  ngOnInit(): void {
    this.pacienteService.obtenerPacientes().subscribe(res=>{
      console.log(res);
      this.pacientes = res;
    })
  } 

  onClick(paciente: any) {

    this.selectedPacienteEvent.emit(paciente);    
  }
}
