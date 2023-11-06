import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit {
  public loading = true;
  public user!: any;
  links = [
    { label: 'Login', link: '/login' },
    { label: 'Registro', link: '/registro' },
]
  ngOnInit(): void {
      setTimeout(()=>{
        this.loading = false;
      },2500);
  }
}
