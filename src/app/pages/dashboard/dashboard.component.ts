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
  links = [
    { label: 'Inicio', link: "/bienvenida" },
    { label: 'Especialistas', link: '/especialistas' },
    { label: 'Pacientes', link: '/pacientes'},
    { label: 'Inicio', link: '/bienvenida' },
]
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
