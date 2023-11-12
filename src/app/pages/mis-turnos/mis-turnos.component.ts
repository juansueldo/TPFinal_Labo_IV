import { Component } from '@angular/core';
import { Turno } from 'src/app/models/turno.models';
import { TurnosService } from 'src/app/services/turnos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent {
  turnos: Array<Turno>=[];
  public loading = true;
  user = null;
  constructor(private turnosService: TurnosService,private usuarioService: UsuariosService){}
  ngOnInit(): void {
    this.turnosService.obtenerTurnos().subscribe(res=>{
      this.turnos = res;
    });
    setTimeout(()=>{
      this.loading = false;

  },2500);
  this.cargarUsuario();
  }
  cargarUsuario() {
    this.user = this.usuarioService.getUsuario();
  }
}
