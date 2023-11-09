import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.scss']
})
export class AltaPacienteComponent {
  public loading = true;
  user = null;
  constructor(private usuarioService: UsuariosService){}
  ngOnInit(): void {
    setTimeout(()=>{
      this.loading = false;

  },2500);
  this.cargarUsuario();
}
cargarUsuario() {
  this.user = this.usuarioService.getUsuario();
}
}
