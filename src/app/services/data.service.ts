
import { Injectable } from '@angular/core';
import { doc, addDoc, collection, collectionData, Firestore, getDoc, getDocs, updateDoc, setDoc } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { Turno } from '../models/turno.models';
import { HistoriaClinica } from '../models/historiaclinica.models';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) {
    
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
}
