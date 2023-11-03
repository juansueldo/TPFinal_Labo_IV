import { Component } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.models';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.component.html',
  styleUrls: ['./listado-pacientes.component.scss']
})
export class ListadoPacientesComponent {
  listaPacientes: Paciente[] = [];
  constructor(private especialistaService: PacienteService){
    this.especialistaService.obtenerPacientes().subscribe((data: Paciente[]) => {
      this.listaPacientes = data;
    });
  }
  ngOnInit() {

  }

}
