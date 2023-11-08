import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Especialista } from 'src/app/models/especialista.models';
import { EspecialistasService } from 'src/app/services/especialistas.service';

@Component({
  selector: 'app-detalle-especialista',
  templateUrl: './detalle-especialista.component.html',
  styleUrls: ['./detalle-especialista.component.scss']
})
export class DetalleEspecialistaComponent {
  @Input() especialista !: Especialista | null;
  @Output() cleanEspecialistaEvent = new EventEmitter<null>;
  constructor(private especialistaService: EspecialistasService){
    console.log(this.especialista);
  }
  cleanEspecialista(){
    console.log('click');
    this.cleanEspecialistaEvent.emit(null);
  }
  
  cambiarEstado(especialista: Especialista): void {
    this.especialistaService.actualizarEspecialista(especialista);
    console.log('Nuevo estado:', especialista.estados);
  }
}
