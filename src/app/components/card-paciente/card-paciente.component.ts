import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.models';


@Component({
  selector: 'app-card-paciente',
  templateUrl: './card-paciente.component.html',
  styleUrls: ['./card-paciente.component.scss']
})
export class CardPacienteComponent {
  @Input() paciente !: Paciente | null;
  @Output() cleanPacienteEvent = new EventEmitter<null>;
  constructor(){

  }
  cleanPaciente(){
    this.cleanPacienteEvent.emit(null);
  }
  
 
}
