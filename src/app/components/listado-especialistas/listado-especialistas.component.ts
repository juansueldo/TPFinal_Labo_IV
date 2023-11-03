import { Component } from '@angular/core';
import { Especialista } from 'src/app/models/especialista.models';
import { EspecialistasService } from 'src/app/services/especialistas.service';

@Component({
  selector: 'app-listado-especialistas',
  templateUrl: './listado-especialistas.component.html',
  styleUrls: ['./listado-especialistas.component.scss']
})
export class ListadoEspecialistasComponent {
  listaEspecialistas: Especialista[] = [];
  constructor(private especialistaService: EspecialistasService){
    this.especialistaService.obtenerEspecialistas().subscribe((data: Especialista[]) => {
      this.listaEspecialistas = data;
    });
  }
  ngOnInit() {

  }
  cambiarEstado(especialista: Especialista): void {
    this.especialistaService.actualizarEspecialista(especialista);
    console.log('Nuevo estado:', especialista.estados.registro);
  }

}
