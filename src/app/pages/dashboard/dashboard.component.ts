import { Component } from '@angular/core';
import { Especialista } from 'src/app/models/especialista.models';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  selected!: Especialista | null;
  loading = false;
  constructor(){}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    //this.user = this.authService.getCurrentUser();
  }

  selectedEspecialista(event: Especialista) {
    console.log(event);
    this.selected = event;
  }
}
