import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {
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
