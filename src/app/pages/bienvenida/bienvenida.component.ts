import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss'],
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('600ms ease', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0%)' }),
        animate('600ms ease', style({ transform: 'translateY(-100%)' })),
      ]),
    ])
  ]
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
