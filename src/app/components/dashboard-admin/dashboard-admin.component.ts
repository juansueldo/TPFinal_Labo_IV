import { Component, Input, OnInit } from '@angular/core';
import { Especialista } from 'src/app/models/especialista.models';
import { EspecialistasService } from 'src/app/services/especialistas.service';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit{
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
    console.log('Nuevo estado:', especialista.estados);
  }

}
