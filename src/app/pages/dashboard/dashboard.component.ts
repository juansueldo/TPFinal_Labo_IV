import { Component } from '@angular/core';
import { Especialista } from 'src/app/models/especialista.models';
import { EspecialistasService } from 'src/app/services/especialistas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  listaEspecialistas: Especialista[] = [];
  constructor(private especialistaService: EspecialistasService){}
  ngOnInit(): void {

    this.especialistaService.obtenerEspecialistas().subscribe((data: Especialista[]) => {
      this.listaEspecialistas = data;
      console.log(this.listaEspecialistas);
    });
  }
}
