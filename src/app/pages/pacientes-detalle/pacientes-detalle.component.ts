import { Component } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.models';

@Component({
  selector: 'app-pacientes-detalle',
  templateUrl: './pacientes-detalle.component.html',
  styleUrls: ['./pacientes-detalle.component.scss']
})
export class PacientesDetalleComponent {
  selected!: Paciente | null;
  loading = false;
  links = [
    { label: 'Inicio', link: "/bienvenida" },
    { label: 'Especialistas', link: '/especialistas' },
    { label: 'Dahsboard', link: 'dashboard' },
    { label: 'Inicio', link: '/bienvenida' },
]
  constructor(){}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    //this.user = this.authService.getCurrentUser();
  }

  selectedPaciente(event: Paciente) {
    console.log(event);
    this.selected = event;
  }
}
