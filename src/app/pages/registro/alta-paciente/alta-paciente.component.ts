import { Component } from '@angular/core';

@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.scss']
})
export class AltaPacienteComponent {
  public loading = false;
  ngOnInit(): void {
    setTimeout(()=>{
      this.loading = false;

  },2500);
  }
}
