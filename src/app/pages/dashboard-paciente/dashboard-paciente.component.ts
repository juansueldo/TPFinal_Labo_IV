import { Component } from '@angular/core';
import { Especialista } from 'src/app/models/especialista.models';
import { HistoriaClinica } from 'src/app/models/historiaclinica.models';
import { Especialidad } from 'src/app/models/interfaces.models';
import { Paciente } from 'src/app/models/paciente.models';
import { Turno } from 'src/app/models/turno.models';
import { DataService } from 'src/app/services/data.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-dashboard-paciente',
  templateUrl: './dashboard-paciente.component.html',
  styleUrls: ['./dashboard-paciente.component.scss']
})
export class DashboardPacienteComponent {
  usuario:any;
  turnos:Turno[] = [];
  // turnosFiltrados:Turno[] = [];
  // turnosFiltrados$:Subject<Turno[]>;
  turnoElegido:Turno;
  fechaAux:string;
  especialistaNombreCompleto = "";
  pacienteNombreCompleto = "";
  especialista:Especialista;
  especialidad:string;
  estado:string = "";  
  comentarioAux = "";
  comentario = "";
  reseniaAux = "";
  resenia = "";
  calificacion = "";
  tipo = "";

  // Filtro
  especialistas:Especialista[] = [];
  especialidades;
  pacientes:Paciente[] = [];
  filtro = "";

  // Popup
  formModal: any;
  popUpRazon = "";
  mensajeError = "";
  estrellas:number = 0;

  // historia
  altura:string = "";
  peso:number = 0;
  temperatura:number = 0;
  presion:number = 0;
  dinamicos: {clave: string, valor: string}[] = [];
  cantidadDatos = 0;

  // ENCUESTA
  preguntas:string[] = ["","",""];
    
  constructor(private usuarioService:UsuariosService,private data: DataService, private especialidadesSerivce: EspecialidadesService){}

  ngOnInit(): void {
    // this.turnosFiltrados$ = new Subject();

    
    this.especialidadesSerivce.obtenerEspecialidades().subscribe(esp => {
      this.especialidades = esp;
    });
    this.data.getTurnosDB().subscribe(turnos => {
      this.especialistas = this.usuarioService.especialistas;
      this.pacientes = this.usuarioService.pacientes;
      this.turnos = [];
      this.usuario = this.usuarioService.getUsuario();
      console.log(this.usuario)
      this.tipo = this.usuario.tipo;
      if(this.usuario.tipo != "Admin"){
        turnos.forEach(turno => {
          if(this.usuario.tipo == "Paciente" && turno.paciente == this.usuario.mail){
            this.turnos.push(turno);
          }
          else if(this.usuario.tipo == "Especialista" && turno.especialista == this.usuario.mail){
            this.turnos.push(turno);
          }
        });
      }
      else{
        this.turnos = turnos;
      }
      this.ordernarListaTurnos();
 
      // this.turnosFiltrados = this.turnos;
      // this.turnosFiltrados$.next(this.turnos);
    });
    // this.turnosFiltrados$.subscribe(turnos => {
    //   this.turnosFiltrados = turnos;
    // });
  }

  verTurno(turno:Turno){
    this.turnos.forEach(tur => {
      if(tur.especialista == turno.especialista && tur.dia == turno.dia && tur.mes == turno.mes && tur.anio == turno.anio && tur.hora == turno.hora &&
        tur.especialidad == turno.especialidad){
        this.turnoElegido = tur;
        this.fechaAux = tur.hora + "Hs " + tur.dia + " " + tur.mes + " " + tur.anio;
        this.especialidad = tur.especialidad;
        this.buscarEspecialista(tur.especialista);
        this.buscarPaciente(tur.paciente);
        this.estado = tur.estado;
        this.comentario = tur.comentario;
        this.calificacion = tur.calificacion;
      }
    });
  }

  agregarValorDinamico(valor:string){
    if(valor == 'sumar' && this.cantidadDatos < 3){
      this.cantidadDatos++;
      this.dinamicos.push({clave: "", valor: ""});
    }
    else if(valor == 'restar' && this.cantidadDatos > 0){
      this.cantidadDatos--;
      this.dinamicos.splice(-1);
    }
  }

  calificar(estrellas:number){
    this.estrellas = estrellas;
  }

  // filtarTurnos(filtro:string, tipo:string){
  //   this.turnosFiltrados = [];
  //   this.turnos.forEach(turno => {
  //     if(filtro == 'sinFiltro'){
  //       this.turnosFiltrados.push(turno);
  //     }
  //     else if(tipo == "especialidades" && turno.especialidad == filtro){
  //       this.turnosFiltrados.push(turno);
  //     }
  //     else if(tipo == "especialistas" && turno.especialista == filtro){
  //       this.turnosFiltrados.push(turno);
  //     }
  //     else if(tipo == "pacientes" && turno.paciente == filtro){
  //       this.turnosFiltrados.push(turno);
  //     }
  //   });
  //   this.turnosFiltrados$.next(this.turnosFiltrados);
  // }

  abrirPopUp(razon:string){
    this.popUpRazon = razon;
    this.formModal.show();
  }

  cerrarPopUp(){
    this.formModal.hide();
  }

  completarResenia(){
    this.resenia = this.reseniaAux;
    this.cerrarPopUp();
  }

  completarComentario(){
    this.comentario = this.comentarioAux;
    this.cerrarPopUp();
  }

  buscarEspecialista(mail:string){
    this.usuarioService.especialistas.forEach(esp => {
      if(esp.email == mail){
        this.especialista = esp;
        this.especialistaNombreCompleto = esp.nombre + " " + esp.apellido;
      }
    });
  }

  buscarPaciente(mail:string){
    this.usuarioService.pacientes.forEach(esp => {
      if(esp.email == mail){
        this.pacienteNombreCompleto = esp.nombre + " " + esp.apellido;
      }
    });
  }

  ordernarListaTurnos(){
    this.turnos.sort((one, two) => {
      if(one.anio < two.anio){
        return 1;
      }
      else if(one.anio == two.anio && this.mesToNumber(one.mes) < this.mesToNumber(two.mes)){
        return 1;
      }
      else if(one.anio == two.anio && one.mes == two.mes && one.dia < two.dia){
        return 1;
      }
      else if(one.anio == two.anio && one.mes == two.mes && one.dia == two.dia && one.hora < two.hora){
        return 1;
      }
      return -1;
    });
  }

  finalizarTurno(){
    if(this.comentarioAux == "" || this.altura == "" || this.peso == 0 || this.temperatura == 0 || this.presion == 0){
      this.mensajeError = "Complete los campos";
    }
    else{
      this.estado = "finalizado";
      this.turnoElegido.estado = "finalizado";
      this.comentario = this.comentarioAux
      this.turnoElegido.comentario = this.comentario;
      let fechar = new Date();
      this.turnoElegido.fecha = fechar.getDate().toString()+'/'+fechar.getMonth().toString()+'/'+fechar.getFullYear().toString();
      this.data.updateTurnos(this.turnoElegido);
      this.comentario == "";
      this.altura == "";
      this.peso == 0;
      this.temperatura == 0;
      this.presion == 0;
      this.data.cargarHistoriasBD(new HistoriaClinica("",this.turnoElegido.paciente,this.turnoElegido.especialista,this.dinamicos,this.altura,
        this.peso,this.temperatura.toString(),this.presion.toString(),this.turnoElegido.especialidad));
      this.limpiarData();
      this.cerrarPopUp();
    }
  }

  modificarTurno(estado:string){
    if(this.comentarioAux == ""){
      this.mensajeError = "Complete el comentario";
    }
    else{
      this.estado = estado;
      this.turnoElegido.estado = estado;
      this.comentario = this.comentarioAux;
      this.turnoElegido.comentario = this.comentario;
      this.turnoElegido.resenia = this.resenia;
      this.data.updateTurnos(this.turnoElegido);
      this.limpiarData();
      this.cerrarPopUp();
    }
  }

  limpiarData(){
    this.comentarioAux = "";
    this.comentario = "";
    this.reseniaAux = "";
    this.resenia = "";
    this.calificacion = "";
  }

  modificarTurnoSinComentario(estado:string){
    this.estado = estado;
    this.turnoElegido.estado = estado;
    this.turnoElegido.comentario = this.comentario;
    this.data.updateTurnos(this.turnoElegido);
    this.limpiarData();
    this.cerrarPopUp();
  }

  calificarTurno(){
    if(this.calificacion == ""){
      this.mensajeError = "Complete el comentario";
    }
    else{
      this.turnoElegido.calificacion = this.calificacion;
      this.data.updateTurnos(this.turnoElegido);
      this.limpiarData();
      this.cerrarPopUp();
    }
  }

  resetearMensajeError(){
    this.mensajeError = "";
  }

  mesToNumber(mes:string){
    let numero = -1;
    switch(mes){
      case "Enero":
        numero = 1;
        break;
      case "Febrero":
        numero = 2;
        break;
      case "Marzo":
        numero = 3;
        break;
      case "Abril":
        numero = 4;
        break;
      case "Mayo":
        numero = 5;
        break;
      case "Junio":
        numero = 6;
        break;
      case "Julio":
        numero = 7;
        break;
      case "Agosto":
        numero = 8;
        break;
      case "Septiembre":
        numero = 9;
        break;
      case "Octubre":
        numero = 10;
        break;
      case "Noviembre":
        numero = 11;
        break;
      case "Diciembre":
        numero = 12;
        break;
    }
  }
}
