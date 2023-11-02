import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-especialista',
  templateUrl: './alta-especialista.component.html',
  styleUrls: ['./alta-especialista.component.scss']
})
export class AltaEspecialistaComponent implements OnInit {
  public loading = false;
  ngOnInit(): void {
    setTimeout(()=>{
      this.loading = false;

  },2500);
}

}
