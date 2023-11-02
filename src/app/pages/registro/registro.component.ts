import { Component, ViewChild } from '@angular/core';
import { FormPacienteComponent } from 'src/app/components/form-paciente/form-paciente.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  public loading = false;
  public user!: any;
  public signup: boolean = true;
  public activoPaciente: string = 'btn-outline-primary activo';
  public activoEspecialista = 'btn-primary';
  @ViewChild('form') form!: FormPacienteComponent;

  ngOnInit(): void {
    setTimeout(()=>{
      this.loading = false;

  },2500);
    this.cargarUsuario();
  }
  cargarUsuario() {
   
  }
  esEspecialista(){
    this.signup = true;
    this.activoPaciente = 'btn-primary';
    this.activoEspecialista ='btn-outline-primary activo';
  }
  esPaciente(){
    this.signup = false;
    
    this.activoPaciente = 'btn-outline-primary activo';
    this.activoEspecialista ='btn-primary';
  }
}
