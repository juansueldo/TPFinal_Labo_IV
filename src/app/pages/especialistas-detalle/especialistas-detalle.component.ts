import { Component } from '@angular/core';
import { Especialista } from 'src/app/models/especialista.models';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-especialistas-detalle',
  templateUrl: './especialistas-detalle.component.html',
  styleUrls: ['./especialistas-detalle.component.scss']
})
export class EspecialistasDetalleComponent {
  selected!: Especialista | null;
  loading = false;
  user: any | null;
  constructor(private usuarioService: UsuariosService){}

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.user = this.usuarioService.getUsuario();
  }

  selectedEspecialista(event: Especialista) {
    console.log(event);
    this.selected = event;
  }
}
