import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/models/turno.models';
import { TurnosService } from 'src/app/services/turnos.service';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss']
})
export class TurnosPacienteComponent implements OnInit {
  turnos: Array<Turno>=[];
  constructor(private turnosService: TurnosService){}
  ngOnInit(): void {
    this.turnosService.obtenerTurnos().subscribe(res=>{
      this.turnos = res;
    })
  }
}
