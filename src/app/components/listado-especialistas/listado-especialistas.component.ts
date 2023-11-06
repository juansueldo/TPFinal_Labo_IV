import { Component, EventEmitter, Output } from '@angular/core';
import { Especialista } from 'src/app/models/especialista.models';
import { EspecialistasService } from 'src/app/services/especialistas.service';

@Component({
  selector: 'app-listado-especialistas',
  templateUrl: './listado-especialistas.component.html',
  styleUrls: ['./listado-especialistas.component.scss']
})
export class ListadoEspecialistasComponent {
  especialistas : Array<Especialista> = [];
  @Output() selectedEspecialistaEvent = new EventEmitter<Especialista>();

  constructor(private especialistaService : EspecialistasService) {
  }
  ngOnInit(): void {
    this.especialistaService.obtenerEspecialistas().subscribe(res=>{
      console.log(res);
      this.especialistas = res;
    })
  } 

  onClick(especialista: any) {

    this.selectedEspecialistaEvent.emit(especialista);    
  }

}
