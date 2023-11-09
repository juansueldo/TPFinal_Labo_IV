import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-alta-especialista',
  templateUrl: './alta-especialista.component.html',
  styleUrls: ['./alta-especialista.component.scss']
})
export class AltaEspecialistaComponent implements OnInit {
  public loading = false;
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
