
import { Injectable } from '@angular/core';
import { doc, addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc, setDoc } from "@angular/fire/firestore";
import { Observable, Subject } from 'rxjs';
import { Turno } from '../models/turno.models';
import{LogIngreso} from '../models/log-ingreso';

import { HistoriaClinica } from '../models/historiaclinica.models';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  historias$ : Subject<HistoriaClinica[]>;
  historias:HistoriaClinica[];
  constructor(private firestore: Firestore) {
    this.historias$ = new Subject();

    this.getHistoriaDB().subscribe(historia => {
      this.historias = historia;
      this.historias$.next(historia);
    });
 }
  getTurnosDB(): Observable<Turno[]>{
    let col = collection(this.firestore, 'turnos');
    return collectionData(col, { idField: 'id'}) as Observable<Turno[]>;
  }
  cargarTurnosBD(turno:Turno){
    let col = collection(this.firestore, 'turnos');
    addDoc(col, Object.assign({}, turno));
  }
  updateTurnos(turno:Turno){
    let col = collection(this.firestore, 'turnos');
    const documento = doc(col, turno.id);
    updateDoc(documento, {
      estado: turno.estado,
      comentario: turno.comentario,
      calificacion: turno.calificacion,
      encuesta: turno.encuesta,
      fecha: turno.fecha,
      resenia: turno.resenia,
    });
  }

    // HISTORIA CLINICA
    getHistoriaDB(): Observable<HistoriaClinica[]>{
      let col = collection(this.firestore, 'historias');
      return collectionData(col, { idField: 'id'}) as Observable<HistoriaClinica[]>;
    }
    cargarHistoriasBD(historia:HistoriaClinica){
      let col = collection(this.firestore, 'historias');
      addDoc(col, Object.assign({}, historia));
    }
    updateHistoria(historia:HistoriaClinica){
      let col = collection(this.firestore, 'historias');
      const documento = doc(col, historia.id);
      updateDoc(documento, {
        especialista:historia.especialista,
        dinamicos:historia.dinamicos,
        altura:historia.altura,
        peso:historia.peso,
        temperatura:historia.temperatura,
        presion:historia.presion,
        especialidad:historia.especialidad
      });
    }
    getLogIngresos():Observable<LogIngreso[]>{
      let col = collection(this.firestore, 'logIngresos');
      return collectionData(col) as Observable<LogIngreso[]>;
    }
    cargarLogIngresos(ingresos:LogIngreso){
      let col = collection(this.firestore, 'logIngresos');
      addDoc(col, Object.assign({}, ingresos));
    }
}
