import { Component } from '@angular/core';
import { Especialista } from 'src/app/models/especialista.models';

@Component({
  selector: 'app-especialistas-detalle',
  templateUrl: './especialistas-detalle.component.html',
  styleUrls: ['./especialistas-detalle.component.scss']
})
export class EspecialistasDetalleComponent {
  selected!: Especialista | null;
  loading = false;
  links = [
    { label: 'Inicio', link: "/bienvenida" },
    { label: 'Dashboard', link: '/dashboard' },
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
