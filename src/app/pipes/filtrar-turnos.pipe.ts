import { Pipe, PipeTransform } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { Turno } from '../models/turno.models';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'filtrarTurnos'
})
export class FiltrarTurnosPipe implements PipeTransform {
  constructor(private usuarioService:UsuariosService, private data: DataService){}

  transform(turnos:Turno[], filtro:string): Turno[] {
    if(!turnos || !filtro){
      return turnos;
    }

    filtro = filtro.toLowerCase();
    let len = filtro.length;

    // ESTADO
    let turnosAux = turnos.filter(turno => {
      if(turno.estado.toLowerCase().substring(0, len) == filtro){
        return true;
      }
      return false;
    });
    if(turnosAux.length > 0){
      return turnosAux;
    }
   

    // ESPECIALISTA
    turnosAux = turnos.filter(turno => {
      let retorno = false;
      this.usuarioService.especialistas.forEach(esp => {
        if(esp.email == turno.especialista){
          if(esp.nombre.toLowerCase().substring(0, len) == filtro){
            retorno = true;
          }
        }
      });
      return retorno;
    });
    if(turnosAux.length > 0){
      return turnosAux;
    }
    // DINAMICOS
  
    turnosAux = turnos.filter(turno => {
      let retorno = false;
      this.data.historias.forEach(historia => {
          if ((historia.paciente == turno.paciente && historia.especialidad == turno.especialidad) && turno.estado == "finalizado") {
              historia.dinamicos.forEach(dinamico => {
                  console.log(dinamico);
                  console.log(dinamico.clave.toLowerCase());
                  console.log(filtro);
                  // Check if any "clave" value matches the filter condition
                  if (dinamico.clave.toLowerCase().substring(0, len) == filtro && turno.estado == "finalizado") {
                      retorno = true;
                      console.log(turno);
                  }
              });
          }
      });
      return retorno;
  });
  
  if (turnosAux.length > 0) {
      return turnosAux;
  }
   //DATOS FIJOS
    turnosAux = turnos.filter(turno => {
      let retorno = false;
      this.data.historias.forEach(historia=>{
          if((historia.paciente == turno.paciente && historia.especialidad == turno.especialidad) && turno.estado =="finalizado"){
            if(historia.altura.toLowerCase().substring(0, len) == filtro && turno.estado =="finalizado"){
              retorno = true;
          
            }
            else if(historia.peso.toString().toLowerCase().substring(0, len) == filtro && turno.estado =="finalizado"){
              retorno = true;
              
            }
             else if(historia.presion.toString().toLowerCase().substring(0, len) == filtro && turno.estado =="finalizado"){
              retorno = true;
              
            }
             else if(historia.temperatura.toString().toLowerCase().substring(0, len) == filtro && turno.estado =="finalizado"){
              retorno = true;
             
            }
          
          }
      })
      return retorno;
    });
    if(turnosAux.length > 0){
      return turnosAux;
    }
    // ESPECIALIDAD
    turnosAux = turnos.filter(turno => {
      if(turno.especialidad.toLowerCase().substring(0, len) == filtro){
        return true;
      }
      else if(turno.comentario.toLowerCase().substring(0, len) == filtro){
        return true;
      }
      else if(turno.hora.toString().toLowerCase().substring(0, len) == filtro){
        return true;
      }
      else if(turno.mes.toString().toLowerCase().substring(0, len) == filtro){
        return true;
      }
      else if(turno.estado.toLowerCase().substring(0, len) == filtro){
        return true;
      }
      return false;
    });
    if(turnosAux.length > 0){
      return turnosAux;
    }

    // PACIENTE
    turnosAux = turnos.filter(turno => {
      let retorno = false;
      this.usuarioService.pacientes.forEach(pac => {
        if(pac.email == turno.paciente){
          if(pac.nombre.toLowerCase().substring(0, len) == filtro){
            retorno = true;
          }
        }
      });
      return retorno;
    });
    if(turnosAux.length > 0){
      return turnosAux;
    }

    return [];
  }
 
}
