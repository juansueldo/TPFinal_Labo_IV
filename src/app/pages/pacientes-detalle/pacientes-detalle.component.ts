import { Component } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.models';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-pacientes-detalle',
  templateUrl: './pacientes-detalle.component.html',
  styleUrls: ['./pacientes-detalle.component.scss']
})
export class PacientesDetalleComponent {
  selected!: Paciente | null;
  loading = false;
  user: any | null;
  constructor(private usuarioService: UsuariosService){}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.user = this.usuarioService.getUsuario();
  }

  selectedPaciente(event: Paciente) {
    console.log(event);
    this.selected = event;
  }
}
