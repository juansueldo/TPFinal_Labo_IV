import { Component } from '@angular/core';
import { HistoriaClinica } from 'src/app/models/historiaclinica.models';
import { Paciente } from 'src/app/models/paciente.models';
import { DataService } from 'src/app/services/data.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.scss']
})
export class HistoriaComponent {
  mail = "";
  paciente:Paciente = new Paciente("","",0,"","","","","","");
  historias:HistoriaClinica[] = [];

  constructor(private usuarioService:UsuariosService,private data:DataService){}

  ngOnInit(): void {
   
    this.mail = history.state.mail;
    const usuario = this.usuarioService.getUsuario();
    if(usuario.tipo == "paciente"){
      this.paciente = usuario;
    }
    this.cargarPacientes();
  } 

  

  cargarPacientes(){
    this.historias = [];
    this.usuarioService.pacientes.forEach(paciente => {
      if(this.mail == paciente.email){
        this.paciente = paciente;
      }
    });
    this.data.getHistoriaDB().subscribe(historias => {
      historias.forEach(historia=>{
        if(historia.paciente === this.paciente.email){
          this.historias.push(historia);
        }
      })
      
    });
  }
}
