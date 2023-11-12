import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Especialista } from 'src/app/models/especialista.models';
import { HorarioEspecialista } from 'src/app/models/horario-especialista.models';
import { Especialidad } from 'src/app/models/interfaces.models';
import { Turno } from 'src/app/models/turno.models';
import { DataService } from 'src/app/services/data.service';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { HorariosEspecialistaService } from 'src/app/services/horarios-especialista.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {
  hoy:Date = new Date();
  now:Date = new Date();
  dia:string = this.now.getDate().toString();
  mesNumero:number = this.now.getMonth();
  mes:string = this.mesNumeroToString(this.mesNumero);
  anio:string = this.now.getFullYear().toString();
  hora:number = this.now.getHours();
  diaString:string = this.diaSemanaString(this.now.getDay());
  restarDia = false;
  sumarDia = true;
  public loading = true;
  user = null;

  // HORARIOS
  horarios:string[] = ["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
    "16:00","16:30","17:00","17:30","18:00","18:30"];
  horariosDisponibles:string[] = [];
  horariosDisponiblesOtroFormato:string[] = [];

  // DOM
  etapa = "especialista";

  // TURNOS
  turnos:Turno[] = [];

  // Especialidades
  especialidades:any ;
  especialidadElegida = "";
  especialistas:Especialista[] = [];
  especialistaElegido:Especialista;
  especialistaElegidoStr = "";
  diaElegido = "";
  horarioElegido = "";

  // HORARIOS
  horariosEspecialistas:HorarioEspecialista[] = [];

  constructor(private data:DataService,private horariosEspecialistaService: HorariosEspecialistaService, private especialidadesService: EspecialidadesService, private usuarioService:UsuariosService, private router: Router){}
  
  ngOnInit(): void {

    this.especialidadesService.obtenerEspecialidades().subscribe(esp => {
      console.log(esp);
      this.especialidades = esp;
      this.ordernarListaEspecialidades();
      this.especialistas = [];
      this.usuarioService.especialistas.forEach(esp => {
        this.especialistas.push(esp);
      });
    });
    this.horariosEspecialistaService.getHorarioEspecialistas().subscribe(horario => {
      this.horariosEspecialistas = horario;
    });
    this.data.getTurnosDB().subscribe(turnos => {
      this.turnos = turnos;
    });
    setTimeout(()=>{
      this.loading = false;

  },2500);
  this.cargarUsuario();
  }
  cargarUsuario() {
    this.user = this.usuarioService.getUsuario();
  }

  elegirEspecialidad(esp:string){
    this.especialidadElegida = esp;
    this.volver("horario");
  }


  elegirHorario(horario:string){
    this.horarioElegido = this.volverCambiarFormato(horario);
    this.diaElegido = this.horarioElegido + " Hrs. " + this.diaString + " " + this.dia + " de " + this.mes;
    this.volver("confirmar");
  }

  confirmar(){
    this.data.cargarTurnosBD(new Turno("",this.usuarioService.getUsuario().email, this.especialistaElegido.email,this.especialidadElegida,
    this.dia,this.mes,this.anio,this.horarioElegido,"pendiente","","",""));
    this.volver("fin");
  }

  elegirEspecialista(nombre:string, apellido:string){
    let indice = -1;
    this.especialistas.forEach((esp, index) => {
      if(esp.nombre == nombre && esp.apellido == apellido){
        indice = index;
        this.especialidades = esp.especialidades;
      }
    });
    this.especialistaElegido = this.especialistas[indice];
    this.especialistaElegidoStr = this.especialistaElegido.nombre + " " + this.especialistaElegido.apellido;
    console.log(this.especialistaElegidoStr);
    this.cambiarHorariosPorEspecialista();
    this.volver('especialidad');
  }

  cambiarHorariosPorEspecialista(){
    let indiceIni = 0;
    let indiceFin = 0;
    if(this.diaString == "Sabado"){
      indiceFin = 12;
    }
    else{
      indiceFin = this.horarios.length;
    }
    this.horariosEspecialistas.forEach(horEsp => {
      if(horEsp.mail == this.especialistaElegido.email){
        this.horarios.forEach((horarios,index) => {
          switch(this.diaString){
            case "Lunes":
              if(horarios == horEsp.lunInicio){
                indiceIni = index;
              }
              if(horarios == horEsp.lunFin){
                indiceFin = index;
              }
              if(horEsp.estados[0] == "Inhabilitado"){
                indiceIni = 0;
                indiceFin = 0;
              }
              break;
            case "Martes":
              if(horarios == horEsp.marInicio){
                indiceIni = index;
              }
              if(horarios == horEsp.marFin){
                indiceFin = index;
              }
              if(horEsp.estados[1] == "Inhabilitado"){
                indiceIni = 0;
                indiceFin = 0;
              }
              break;
            case "Miercoles":
              if(horarios == horEsp.mierInicio){
                indiceIni = index;
              }
              if(horarios == horEsp.mierFin){
                indiceFin = index;
              }
              if(horEsp.estados[2] == "Inhabilitado"){
                indiceIni = 0;
                indiceFin = 0;
              }
              break;
            case "Jueves":
              if(horarios == horEsp.jueInicio){
                indiceIni = index;
              }
              if(horarios == horEsp.jueFin){
                indiceFin = index;
              }
              if(horEsp.estados[3] == "Inhabilitado"){
                indiceIni = 0;
                indiceFin = 0;
              }
              break;
            case "Viernes":
              if(horarios == horEsp.vierInicio){
                indiceIni = index;
              }
              if(horarios == horEsp.vierFin){
                indiceFin = index;
              }
              if(horEsp.estados[4] == "Inhabilitado"){
                indiceIni = 0;
                indiceFin = 0;
              }
              break;
            case "Sabado":
              if(horarios == horEsp.sabInicio){
                indiceIni = index;
              }
              if(horarios == horEsp.sabFin){
                indiceFin = index;
              }
              if(horEsp.estados[5] == "Inhabilitado"){
                indiceIni = 0;
                indiceFin = 0;
              }
              break;
            }
          });
        }
      });
    let listAux = [...this.horarios];
    this.horariosDisponibles = listAux.splice(indiceIni,indiceFin-indiceIni);
    this.sacarHorariosNoDisponibles();
    this.cambiarFormato();
  }

  volverCambiarFormato(hora:string){
    let horaAux = hora.split(" ");
    let horaAux2 = horaAux[1].split(":");
    let horaNumber = Number(horaAux2[0]);
    if(horaAux[2] == "PM"){
      horaNumber += 12;
    }
    return horaNumber + ":" + horaAux2[1]; 
  }

  cambiarFormato(){
    this.horariosDisponiblesOtroFormato = [];
    this.horariosDisponibles.forEach(horario => {
      this.horariosDisponiblesOtroFormato.push(this.anio+'-'+this.mesNumero+'-'+this.dia+' '+this.cambiarHoraAmPm(horario));
    });
  }

  cambiarHoraAmPm(hora:string){
    let strAux = hora.split(":");
    let horaAux = strAux[0];
    let minAux = strAux[1];
    if(Number(strAux[0]) > 12){
      horaAux = String(Number(strAux[0])-12);
      return horaAux + ":" + minAux + " PM";
    }
    return horaAux + ":" + minAux + " AM";
  }

  sacarHorariosNoDisponibles(){
    let indices = [];
    let listAux = [...this.horariosDisponibles];
    this.turnos.forEach(turno => {
      this.horariosDisponibles.forEach((horarios,index) => {
        if(turno.especialista == this.especialistaElegido.email && turno.dia == this.dia && turno.hora == horarios){
          indices.push(index);
        }
      });
    })
    indices.forEach(i => {
      listAux.splice(i,1);
      this.horariosDisponibles = listAux;
    });
  }

  volver(lugar:string){
    if(lugar == "home"){
      this.router.navigateByUrl("");
    }
    else if(lugar == "especialidad"){
      this.etapa = "especialidad";
    }
    else if(lugar == "especialista"){
      this.etapa = "especialista";
    }
    else if(lugar == "horario"){
      this.etapa = "horario";
    }
    else if(lugar == "confirmar"){
      this.etapa = "confirmar";
    }
    else if (lugar == "fin"){
      this.etapa = "fin";
    }
    else{
      this.router.navigateByUrl("MisTurnos");
    }
  }

  ordernarListaEspecialidades(){
    this.especialidades.sort((one, two) => (one < two ? -1 : 1));
  }

  cambiarDia(cuando:string){
    let sePuede = false;
    if(cuando == "antes"){
      if(this.limitarFecha("restar")){
        sePuede = true;
        this.now.setDate(this.now.getDate() - 1);
        if(this.now.getDay() == 0){
          this.now.setDate(this.now.getDate() - 1);
        }
      }
    }
    else{
      if(this.limitarFecha("sumar")){
        sePuede = true;
        this.now.setDate(this.now.getDate() + 1);
        if(this.now.getDay() == 0){
          this.now.setDate(this.now.getDate() + 1);
        }
      }
    }
    if(sePuede){
      this.dia = this.now.getDate().toString();
      this.mesNumero = this.now.getMonth();
      this.mes = this.mesNumeroToString(this.mesNumero);
      this.diaString = this.diaSemanaString(this.now.getDay());
      this.anio = this.now.getFullYear().toString();
      this.getHorariosDisponibles();
      this.cambiarHorariosPorEspecialista();
    }
  }


  limitarFecha(sumarOrestar:string){
    let dia = this.hoy.getDate();
    if(this.hoy.getDate()+15 > 30){
      dia = this.hoy.getDate() - 15; 
    }
    if(sumarOrestar == "restar" && (this.hoy.getDate() == this.now.getDate())){
      this.restarDia = false;
      this.sumarDia = true;
      return false;
    }
    else if(sumarOrestar == "sumar" && (dia == this.now.getDate())){
      this.restarDia = true;
      this.sumarDia = false;
      return false;
    }
    this.restarDia = true;
    this.sumarDia = true;
    return true;
  }

  getHorariosDisponibles(){
    if(this.diaString == "Sabado"){
      this.horariosDisponibles = this.horarios.slice(0,12);
    }
    else{
      this.horariosDisponibles = this.horarios;
    }
  }

  diaSemanaString(numero:number){
    let dia = "";
    switch(numero){
      case 1:
        dia = "Lunes";
        break;
      case 2:
        dia = "Martes";
        break;
      case 3:
        dia = "Miercoles";
        break;
      case 4:
        dia = "Jueves";
        break;
      case 5:
        dia = "Viernes";
        break;
      case 6:
        dia = "Sabado";
        break;
      case 0:
        dia = "Domingo";
        break;
    }
    return dia;
  }

  mesNumeroToString(numero:number){
    numero++;
    let mes = "";
    switch(numero){
      case 1:
        mes = "Enero";
        break;
      case 2:
        mes = "Febrero";
        break;
      case 3:
        mes = "Marzo";
        break;
      case 4:
        mes = "Abril";
        break;
      case 5:
        mes = "Mayo";
        break;
      case 6:
        mes = "Junio";
        break;
      case 7:
        mes = "Julio";
        break;
      case 8:
        mes = "Agosto";
        break;
      case 9:
        mes = "Septiembre";
        break;
      case 10:
        mes = "Octubre";
        break;
      case 11:
        mes = "Noviembre";
        break;
      case 12:
        mes = "Diciembre";
        break;
    }
    return mes;
  }
}
